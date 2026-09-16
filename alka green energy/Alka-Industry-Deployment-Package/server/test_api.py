"""
Automated verification test script for Alka Industry REST API.
"""

from app import create_app
from app.database import db
from app.models import User, Consumer, ConsumerStatus

def test_api():
    app = create_app()
    with app.app_context():
        client = app.test_client()

        # 1. Health check
        res = client.get('/api/health')
        assert res.status_code == 200, f"Health check failed: {res.data}"
        print("[OK] Health Check Passed:", res.get_json()['message'])

        # 2. Login as Admin
        res = client.post('/api/auth/login', json={
            "email": "admin@alkaindustry.com",
            "password": "Admin@123"
        })
        assert res.status_code == 200, f"Admin Login failed: {res.data}"
        admin_data = res.get_json()
        admin_token = admin_data['token']
        print("[OK] Admin Login Passed:", admin_data['user']['name'])

        headers = {"Authorization": f"Bearer {admin_token}"}

        # 3. Get Consumers
        res = client.get('/api/consumers', headers=headers)
        assert res.status_code == 200, f"Get consumers failed: {res.data}"
        consumers_data = res.get_json()
        print(f"[OK] Get Consumers Passed: {consumers_data['count']} consumers retrieved")

        # 4. Add Consumer
        res = client.post('/api/consumers', headers=headers, json={
            "name": "Testing Consumer",
            "phone": "9988776655",
            "consumer_number": f"TEST-CON-{db.session.query(Consumer).count() + 100}",
            "discom_name": "MSEDCL",
            "category": "Residential",
            "inverter_capacity": "5kW",
            "address": "Beed Solar Park"
        })
        assert res.status_code == 201, f"Add consumer failed: {res.data}"
        new_c = res.get_json()['consumer']
        print("[OK] Add Consumer Passed:", new_c['name'], f"(ID: {new_c['id']})")

        # 5. Toggle RTS Status
        res = client.patch(f"/api/consumers/{new_c['id']}/rts-status", headers=headers, json={"rts_status": "DONE"})
        assert res.status_code == 200, f"Toggle RTS status failed: {res.data}"
        print("[OK] Toggle RTS Status Passed: New status =", res.get_json()['rts_status'])

        # 6. Toggle National Portal Status
        res = client.patch(f"/api/consumers/{new_c['id']}/national-portal-status", headers=headers, json={"national_portal_status": "DONE"})
        assert res.status_code == 200, f"Toggle NP status failed: {res.data}"
        print("[OK] Toggle National Portal Status Passed: New status =", res.get_json()['national_portal_status'])

        # 7. Upload Geotagged Plant Photo Document
        res = client.post(f"/api/consumers/{new_c['id']}/documents", headers=headers, data={
            "document_type": "plant_photo",
            "capacity_kw": "5kW",
            "gps_lat": 18.9892,
            "gps_long": 75.7601
        })
        assert res.status_code == 201, f"Upload document failed: {res.data}"
        print("[OK] Upload Geotagged Document Passed:", res.get_json()['message'])

        print("\nAll Backend REST API Automated Tests Passed Successfully!")

if __name__ == '__main__':
    test_api()
