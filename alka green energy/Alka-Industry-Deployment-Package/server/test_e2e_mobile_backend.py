"""
End-to-End Mobile-to-Backend Integration Audit Script.
Tests authentication, consumer retrieval, consumer registration, dual status toggles, geotagged document upload, and direct database persistence.
"""

from app import create_app
from app.database import db
from app.models import User, Consumer, ConsumerStatus, ConsumerDocument, AuditLog

def run_e2e_audit():
    print("=" * 60)
    print("STARTING END-TO-END MOBILE-TO-BACKEND INTEGRATION AUDIT")
    print("=" * 60)

    app = create_app()

    results = {}

    with app.app_context():
        client = app.test_client()

        # STEP 1: Network Health Check Endpoint
        try:
            res = client.get('/api/health')
            if res.status_code == 200:
                results['STEP 1: Backend Health Check'] = 'PASS'
                print("[PASS] STEP 1: Backend Health Check (HTTP 200 - OK)")
            else:
                results['STEP 1: Backend Health Check'] = 'FAIL'
                print(f"[FAIL] STEP 1: Backend Health Check (HTTP {res.status_code})")
        except Exception as e:
            results['STEP 1: Backend Health Check'] = f'FAIL ({e})'
            print(f"[FAIL] STEP 1: Backend Health Check ({e})")

        # STEP 2: Agent JWT Authentication & Token Acquisition
        token = None
        agent_user_id = None
        try:
            res = client.post('/api/auth/login', json={
                "email": "agent1@alkaindustry.com",
                "password": "Agent@123"
            })
            if res.status_code == 200 and 'token' in res.get_json():
                token = res.get_json()['token']
                agent_user_id = res.get_json()['user']['id']
                results['STEP 2: Agent Auth & Token Acquisition'] = 'PASS'
                print(f"[PASS] STEP 2: Agent Auth & Token Acquisition (Agent ID: {agent_user_id})")
            else:
                results['STEP 2: Agent Auth & Token Acquisition'] = 'FAIL'
                print(f"[FAIL] STEP 2: Agent Auth & Token Acquisition (HTTP {res.status_code})")
        except Exception as e:
            results['STEP 2: Agent Auth & Token Acquisition'] = f'FAIL ({e})'
            print(f"[FAIL] STEP 2: Agent Auth & Token Acquisition ({e})")

        headers = {"Authorization": f"Bearer {token}"} if token else {}

        # STEP 3: Retrieve Consumers via Search/Filter API
        try:
            res = client.get('/api/consumers', headers=headers)
            if res.status_code == 200 and 'consumers' in res.get_json():
                count = res.get_json()['count']
                results['STEP 3: Retrieve Consumers List'] = f'PASS ({count} records)'
                print(f"[PASS] STEP 3: Retrieve Consumers List ({count} records returned)")
            else:
                results['STEP 3: Retrieve Consumers List'] = 'FAIL'
                print(f"[FAIL] STEP 3: Retrieve Consumers List (HTTP {res.status_code})")
        except Exception as e:
            results['STEP 3: Retrieve Consumers List'] = f'FAIL ({e})'
            print(f"[FAIL] STEP 3: Retrieve Consumers List ({e})")

        # STEP 4: Create New Solar Consumer Record
        new_consumer_id = None
        test_c_number = f"E2E-CON-{Date_Stamp()}"
        try:
            res = client.post('/api/consumers', headers=headers, json={
                "name": "E2E Mobile Audit Customer",
                "phone": "9876543210",
                "consumer_number": test_c_number,
                "discom_name": "MSEDCL",
                "category": "Residential",
                "inverter_capacity": "4kW",
                "address": "Jalna Road, Beed, Maharashtra"
            })
            if res.status_code == 201:
                c_data = res.get_json()['consumer']
                new_consumer_id = c_data['id']
                results['STEP 4: Create Consumer Record'] = f'PASS (Consumer ID: {new_consumer_id})'
                print(f"[PASS] STEP 4: Create Consumer Record (ID: {new_consumer_id}, Number: {test_c_number})")
            else:
                results['STEP 4: Create Consumer Record'] = 'FAIL'
                print(f"[FAIL] STEP 4: Create Consumer Record (HTTP {res.status_code}: {res.data})")
        except Exception as e:
            results['STEP 4: Create Consumer Record'] = f'FAIL ({e})'
            print(f"[FAIL] STEP 4: Create Consumer Record ({e})")

        # STEP 5: Toggle RTS Status (Internal Rooftop Solar Process)
        try:
            res = client.patch(f'/api/consumers/{new_consumer_id}/rts-status', headers=headers, json={"rts_status": "DONE"})
            if res.status_code == 200 and res.get_json()['rts_status'] == 'DONE':
                results['STEP 5: Toggle RTS Status'] = 'PASS'
                print("[PASS] STEP 5: Toggle RTS Status (Updated to DONE)")
            else:
                results['STEP 5: Toggle RTS Status'] = 'FAIL'
                print(f"[FAIL] STEP 5: Toggle RTS Status (HTTP {res.status_code})")
        except Exception as e:
            results['STEP 5: Toggle RTS Status'] = f'FAIL ({e})'
            print(f"[FAIL] STEP 5: Toggle RTS Status ({e})")

        # STEP 6: Toggle National Portal Status (PM Surya Ghar Approval)
        try:
            res = client.patch(f'/api/consumers/{new_consumer_id}/national-portal-status', headers=headers, json={"national_portal_status": "DONE"})
            if res.status_code == 200 and res.get_json()['national_portal_status'] == 'DONE':
                results['STEP 6: Toggle National Portal Status'] = 'PASS'
                print("[PASS] STEP 6: Toggle National Portal Status (Updated to DONE)")
            else:
                results['STEP 6: Toggle National Portal Status'] = 'FAIL'
                print(f"[FAIL] STEP 6: Toggle National Portal Status (HTTP {res.status_code})")
        except Exception as e:
            results['STEP 6: Toggle National Portal Status'] = f'FAIL ({e})'
            print(f"[FAIL] STEP 6: Toggle National Portal Status ({e})")

        # STEP 7: Upload Geotagged Plant Photo Document
        try:
            res = client.post(f'/api/consumers/{new_consumer_id}/documents', headers=headers, data={
                "document_type": "plant_photo",
                "capacity_kw": "4kW",
                "gps_lat": 18.9892,
                "gps_long": 75.7601
            })
            if res.status_code == 201 and 'document' in res.get_json():
                doc_info = res.get_json()['document']
                results['STEP 7: Upload Geotagged Document'] = f'PASS (Doc ID: {doc_info["id"]})'
                print(f"[PASS] STEP 7: Upload Geotagged Document (GPS: {doc_info['gps_lat']}, {doc_info['gps_long']})")
            else:
                results['STEP 7: Upload Geotagged Document'] = 'FAIL'
                print(f"[FAIL] STEP 7: Upload Geotagged Document (HTTP {res.status_code})")
        except Exception as e:
            results['STEP 7: Upload Geotagged Document'] = f'FAIL ({e})'
            print(f"[FAIL] STEP 7: Upload Geotagged Document ({e})")

        # STEP 8: Direct SQLite Database Persistence Query Check
        try:
            db_consumer = Consumer.query.get(new_consumer_id)
            if (db_consumer and 
                db_consumer.status.rts_status == 'DONE' and 
                db_consumer.status.national_portal_status == 'DONE' and 
                len(db_consumer.documents) > 0 and 
                db_consumer.documents[0].gps_lat == 18.9892):
                results['STEP 8: SQLite Database Persistence'] = 'PASS'
                print("[PASS] STEP 8: SQLite Database Persistence Verified (Record & GPS meta matched)")
            else:
                results['STEP 8: SQLite Database Persistence'] = 'FAIL'
                print("[FAIL] STEP 8: SQLite Database Persistence Verification Mismatch")
        except Exception as e:
            results['STEP 8: SQLite Database Persistence'] = f'FAIL ({e})'
            print(f"[FAIL] STEP 8: SQLite Database Persistence ({e})")

    print("=" * 60)
    return results

def Date_Stamp():
    import time
    return int(time.time())

if __name__ == '__main__':
    run_e2e_audit()
