import pytest
import os
import json
from app import create_app
from app.database import db
from app.models import User, Customer, Project, Payment, Enquiry, GovernmentScheme

@pytest.fixture
def app():
    # Use isolated test database
    os.environ["DB_ENGINE"] = "sqlite"
    test_app = create_app()
    test_app.config.update({
        "TESTING": True,
        "SQLALCHEMY_DATABASE_URI": "sqlite:///:memory:"
    })

    with test_app.app_context():
        db.create_all()
        # Seed test fixture data
        admin = User(name="Admin Test", email="admin@test.com", phone="+919000000000", role="ADMIN")
        admin.set_password("AdminPass123")

        user_a = User(name="User A", email="usera@test.com", phone="+919000000001", role="USER")
        user_a.set_password("UserAPass123")

        user_b = User(name="User B", email="userb@test.com", phone="+919000000002", role="USER")
        user_b.set_password("UserBPass123")

        db.session.add_all([admin, user_a, user_b])
        db.session.flush()

        cust_a = Customer(user_id=user_a.id, company_name="User A Home", customer_type="residential")
        cust_b = Customer(user_id=user_b.id, company_name="User B Business", customer_type="commercial")
        db.session.add_all([cust_a, cust_b])
        db.session.flush()

        proj_a = Project(customer_id=cust_a.id, project_name="Project A (5kW)", capacity="5 kW", total_project_cost=200000.0, pending_amount=200000.0)
        proj_b = Project(customer_id=cust_b.id, project_name="Project B (20kW)", capacity="20 kW", total_project_cost=800000.0, pending_amount=800000.0)
        db.session.add_all([proj_a, proj_b])
        db.session.commit()

        yield test_app
        db.drop_all()

@pytest.fixture
def client(app):
    return app.test_client()

def get_token(client, email, password):
    res = client.post('/api/auth/login', json={'email': email, 'password': password})
    return res.get_json()['token']


# Test 1: Successful Registration
def test_successful_registration(client):
    res = client.post('/api/auth/register', json={
        'name': 'New Customer',
        'email': 'newcustomer@test.com',
        'phone': '+919876543210',
        'password': 'Password123',
        'customer_type': 'residential'
    })
    assert res.status_code == 201
    data = res.get_json()
    assert data['status'] == 'success'
    assert 'token' in data

# Test 2: Duplicate Registration Check
def test_duplicate_registration(client):
    res = client.post('/api/auth/register', json={
        'name': 'Duplicate User',
        'email': 'usera@test.com', # Existing email
        'phone': '+919999999999',
        'password': 'Password123'
    })
    assert res.status_code == 409
    assert 'already exists' in res.get_json()['message']

# Test 3: Successful Login
def test_successful_login(client):
    res = client.post('/api/auth/login', json={'email': 'usera@test.com', 'password': 'UserAPass123'})
    assert res.status_code == 200
    assert 'token' in res.get_json()

# Test 4: Invalid Login
def test_invalid_login(client):
    res = client.post('/api/auth/login', json={'email': 'usera@test.com', 'password': 'WrongPassword'})
    assert res.status_code == 401

# Test 5: Unauthenticated Protected Request
def test_unauthenticated_request(client):
    res = client.get('/api/auth/me')
    assert res.status_code == 401

# Test 6: Normal User Accessing Admin Endpoint (403 Forbidden)
def test_normal_user_accessing_admin_endpoint(client):
    token_a = get_token(client, 'usera@test.com', 'UserAPass123')
    res = client.get('/api/admin/projects', headers={'Authorization': f'Bearer {token_a}'})
    assert res.status_code == 403
    assert 'Access forbidden' in res.get_json()['message']

# Test 7: Customer Accessing Own Project
def test_customer_accessing_own_project(client):
    token_a = get_token(client, 'usera@test.com', 'UserAPass123')
    # User A owns Project 1
    res = client.get('/api/projects/1', headers={'Authorization': f'Bearer {token_a}'})
    assert res.status_code == 200
    assert res.get_json()['project']['project_name'] == 'Project A (5kW)'

# Test 8: MANDATORY SECURITY OWNERSHIP TEST (User A accessing User B's project -> 403 Forbidden)
def test_mandatory_ownership_security_check(client):
    token_a = get_token(client, 'usera@test.com', 'UserAPass123')
    # User A attempts to access Project 2 (owned by User B)
    res = client.get('/api/projects/2', headers={'Authorization': f'Bearer {token_a}'})
    assert res.status_code == 403
    assert 'do not have authorization' in res.get_json()['message']

# Test 9: Admin Accessing Customer Data
def test_admin_accessing_customer_data(client):
    admin_token = get_token(client, 'admin@test.com', 'AdminPass123')
    res = client.get('/api/admin/projects', headers={'Authorization': f'Bearer {admin_token}'})
    assert res.status_code == 200
    assert res.get_json()['count'] == 2

# Test 10: Manual Payment Calculation
def test_manual_payment_calculation(client):
    admin_token = get_token(client, 'admin@test.com', 'AdminPass123')
    # Record manual payment of 50,000 for Project 1 (total cost 200,000)
    res = client.post('/api/admin/payments', headers={'Authorization': f'Bearer {admin_token}'}, json={
        'project_id': 1,
        'amount': 50000.0,
        'payment_method': 'CASH',
        'transaction_reference': 'CASH-REC-001'
    })
    assert res.status_code == 201
    summary = res.get_json()['project_summary']
    assert summary['total_amount_paid'] == 50000.0
    assert summary['pending_amount'] == 150000.0
    assert summary['payment_status'] == 'PARTIALLY_PAID'

# Test 11: Public Enquiry Submission
def test_public_enquiry_submission(client):
    res = client.post('/api/enquiries', json={
        'name': 'Test Inquiry',
        'phone': '+919595911226',
        'email': 'inquiry@test.com',
        'customer_type': 'residential',
        'requirement': '5 kW Solar Inquiry'
    })
    assert res.status_code == 201
    assert res.get_json()['status'] == 'success'

# Test 12: Public Government Schemes Retrieval
def test_public_government_schemes_retrieval(client):
    res = client.get('/api/government-schemes')
    assert res.status_code == 200
    assert 'schemes' in res.get_json()
