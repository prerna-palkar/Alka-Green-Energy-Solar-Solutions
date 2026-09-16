import pytest
import os
import json
from app import create_app
from app.database import db
from app.models import User, Customer, Project, Payment, Enquiry, GovernmentScheme, Gallery

@pytest.fixture
def app():
    os.environ["DB_ENGINE"] = "sqlite"
    test_app = create_app()
    test_app.config.update({
        "TESTING": True,
        "SQLALCHEMY_DATABASE_URI": "sqlite:///:memory:"
    })

    with test_app.app_context():
        db.create_all()
        # Seed test data
        admin = User(name="Admin Phase3", email="admin3@test.com", phone="+919111111111", role="ADMIN")
        admin.set_password("AdminPass123")

        user1 = User(name="User Phase3", email="user3@test.com", phone="+919222222222", role="USER")
        user1.set_password("UserPass123")

        db.session.add_all([admin, user1])
        db.session.flush()

        cust = Customer(user_id=user1.id, company_name="Phase3 Residence", customer_type="residential")
        db.session.add(cust)
        db.session.flush()

        proj = Project(
            customer_id=cust.id,
            project_name="Phase3 Solar 10kW",
            capacity="10 kW",
            total_project_cost=500000.0,
            pending_amount=500000.0,
            status="QUOTATION"
        )
        db.session.add(proj)
        db.session.commit()

        yield test_app
        db.drop_all()

@pytest.fixture
def client(app):
    return app.test_client()

def get_admin_token(client):
    res = client.post('/api/auth/login', json={'email': 'admin3@test.com', 'password': 'AdminPass123'})
    return res.get_json()['token']

def get_user_token(client):
    res = client.post('/api/auth/login', json={'email': 'user3@test.com', 'password': 'UserPass123'})
    return res.get_json()['token']


# Test 1: Admin Stats Overview Endpoint
def test_admin_stats_endpoint(client):
    token = get_admin_token(client)
    res = client.get('/api/admin/stats', headers={'Authorization': f'Bearer {token}'})
    assert res.status_code == 200
    data = res.get_json()
    assert data['status'] == 'success'
    assert data['summary']['total_customers'] == 1
    assert data['summary']['total_projects'] == 1
    assert data['summary']['total_project_value'] == 500000.0

# Test 2: Role Security boundary check on admin stats (403 Forbidden for normal user)
def test_normal_user_forbidden_on_admin_stats(client):
    token = get_user_token(client)
    res = client.get('/api/admin/stats', headers={'Authorization': f'Bearer {token}'})
    assert res.status_code == 403

# Test 3: Customer Management & Pagination
def test_customer_management(client):
    token = get_admin_token(client)
    # Add new customer via admin API
    res = client.post('/api/admin/customers', headers={'Authorization': f'Bearer {token}'}, json={
        'name': 'Admin Created Cust',
        'email': 'admincreated@test.com',
        'phone': '+919333333333',
        'company_name': 'New Tech Complex',
        'customer_type': 'commercial'
    })
    assert res.status_code == 201
    assert res.get_json()['customer']['company_name'] == 'New Tech Complex'

    # List customers with pagination
    res_list = client.get('/api/admin/customers?page=1&limit=5', headers={'Authorization': f'Bearer {token}'})
    assert res_list.status_code == 200
    assert len(res_list.get_json()['customers']) == 2

# Test 4: Project Management & Status Transition History
def test_project_status_transition_history(client):
    token = get_admin_token(client)
    # Update project status from QUOTATION -> APPROVED
    res = client.put('/api/admin/projects/1', headers={'Authorization': f'Bearer {token}'}, json={
        'status': 'APPROVED',
        'status_notes': 'Client approved proposal quote.'
    })
    assert res.status_code == 200
    assert res.get_json()['project']['status'] == 'APPROVED'

    # Verify status history entry in detail view
    res_detail = client.get('/api/projects/1', headers={'Authorization': f'Bearer {token}'})
    history = res_detail.get_json()['status_history']
    assert len(history) >= 1
    assert history[-1]['new_status'] == 'APPROVED'

# Test 5: Multi-Step Manual Payment Tracking & Pending Amount Recalculation
def test_multi_step_manual_payment_calculation(client):
    token = get_admin_token(client)
    # Project 1 Total Cost = 500,000.0

    # Step A: Record initial manual payment of 100,000
    res1 = client.post('/api/admin/payments', headers={'Authorization': f'Bearer {token}'}, json={
        'project_id': 1,
        'amount': 100000.0,
        'payment_method': 'BANK_TRANSFER',
        'receipt_number': 'REC-1001'
    })
    assert res1.status_code == 201
    s1 = res1.get_json()['project_summary']
    assert s1['total_amount_paid'] == 100000.0
    assert s1['pending_amount'] == 400000.0
    assert s1['payment_status'] == 'PARTIALLY_PAID'

    # Step B: Record final payment of 400,000
    res2 = client.post('/api/admin/payments', headers={'Authorization': f'Bearer {token}'}, json={
        'project_id': 1,
        'amount': 400000.0,
        'payment_method': 'CHEQUE',
        'receipt_number': 'REC-1002'
    })
    assert res2.status_code == 201
    s2 = res2.get_json()['project_summary']
    assert s2['total_amount_paid'] == 500000.0
    assert s2['pending_amount'] == 0.0
    assert s2['payment_status'] == 'PAID'

# Test 6: Enquiry Management & Status Updates
def test_enquiry_status_transition(client):
    token = get_admin_token(client)
    # Submit public enquiry
    enq_res = client.post('/api/enquiries', json={
        'name': 'Lead Test',
        'phone': '+919595911226',
        'requirement': '10 kW Solar'
    })
    enq_id = enq_res.get_json()['data']['id']

    # Update enquiry status to CONTACTED
    res_up = client.put(f'/api/admin/enquiries/{enq_id}', headers={'Authorization': f'Bearer {token}'}, json={'status': 'CONTACTED'})
    assert res_up.status_code == 200
    assert res_up.get_json()['enquiry']['status'] == 'CONTACTED'

# Test 7: Gallery CRUD
def test_gallery_crud(client):
    token = get_admin_token(client)
    res = client.post('/api/admin/gallery', headers={'Authorization': f'Bearer {token}'}, json={
        'title': 'Test Array Photo',
        'image_url': 'https://example.com/solar.jpg',
        'category': 'residential'
    })
    assert res.status_code == 201
    item_id = res.get_json()['item']['id']

    res_del = client.delete(f'/api/admin/gallery/{item_id}', headers={'Authorization': f'Bearer {token}'})
    assert res_del.status_code == 200
