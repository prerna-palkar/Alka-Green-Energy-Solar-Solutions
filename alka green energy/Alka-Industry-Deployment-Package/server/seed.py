"""
Seed Script for Alka Industry Solar Solutions - Rooftop Consumer Management System
Populates Admin, Field Agents, RTS Solar Consumers, Statuses, and Sample Documents.
"""

from app import create_app
from app.database import db
from app.models import User, Consumer, ConsumerStatus, ConsumerDocument, AuditLog, ChatbotFAQ, GovernmentScheme

app = create_app()

def seed_database():
    with app.app_context():
        db.create_all()

        # 1. System Admin
        admin = User.query.filter_by(email="admin@alkaindustry.com").first()
        if not admin:
            admin = User(
                name="Alka Admin",
                email="admin@alkaindustry.com",
                phone="+919595911226",
                role="ADMIN"
            )
            admin.set_password("Admin@123")
            db.session.add(admin)
            print("[OK] Created Admin Account: admin@alkaindustry.com / Admin@123")

        # Also ensure backup admin account
        admin_backup = User.query.filter_by(email="admin@alkagreenenergy.com").first()
        if not admin_backup:
            admin_backup = User(
                name="Alka Green Admin",
                email="admin@alkagreenenergy.com",
                phone="+919822011226",
                role="ADMIN"
            )
            admin_backup.set_password("Admin@123")
            db.session.add(admin_backup)

        # 2. Field Agent 1
        agent1 = User.query.filter_by(email="agent1@alkaindustry.com").first()
        if not agent1:
            agent1 = User(
                name="Rajesh Sharma (Agent)",
                email="agent1@alkaindustry.com",
                phone="+919876543210",
                role="AGENT"
            )
            agent1.set_password("Agent@123")
            db.session.add(agent1)
            print("[OK] Created Agent 1: agent1@alkaindustry.com / Agent@123")

        # 3. Field Agent 2
        agent2 = User.query.filter_by(email="agent2@alkaindustry.com").first()
        if not agent2:
            agent2 = User(
                name="Priya Verma (Agent)",
                email="agent2@alkaindustry.com",
                phone="+919876543211",
                role="AGENT"
            )
            agent2.set_password("Agent@123")
            db.session.add(agent2)
            print("[OK] Created Agent 2: agent2@alkaindustry.com / Agent@123")

        db.session.flush()

        # 4. Seed Rooftop Solar Consumers
        if Consumer.query.count() == 0:
            sample_consumers = [
                {
                    "name": "Anil Deshmukh",
                    "phone": "9823012345",
                    "address": "Plot 42, Shivajinagar, Beed",
                    "consumer_number": "MSEDCL-8839201",
                    "discom_name": "MSEDCL",
                    "category": "Residential",
                    "agent_id": agent1.id if agent1 else None,
                    "inverter_capacity": "3kW",
                    "rts_status": "DONE",
                    "national_portal_status": "DONE"
                },
                {
                    "name": "Sunita Patil",
                    "phone": "9823019876",
                    "address": "Flat 301, Sunrise Heights, Jalna Road, Beed",
                    "consumer_number": "MSEDCL-4492810",
                    "discom_name": "MSEDCL",
                    "category": "Residential",
                    "agent_id": agent1.id if agent1 else None,
                    "inverter_capacity": "4kW",
                    "rts_status": "DONE",
                    "national_portal_status": "NOT_DONE"
                },
                {
                    "name": "Maheshwar Spinning Mills",
                    "phone": "9890123456",
                    "address": "Gat No 112, MIDC Phase II, Beed",
                    "consumer_number": "MSEDCL-9920183",
                    "discom_name": "MSEDCL",
                    "category": "Commercial",
                    "agent_id": agent2.id if agent2 else None,
                    "inverter_capacity": "10kW",
                    "rts_status": "NOT_DONE",
                    "national_portal_status": "NOT_DONE"
                },
                {
                    "name": "Vikram Solanki",
                    "phone": "9422918273",
                    "address": "House 18, Green Park Colony, Beed",
                    "consumer_number": "TATA-7739102",
                    "discom_name": "Tata Power",
                    "category": "Residential",
                    "agent_id": agent2.id if agent2 else None,
                    "inverter_capacity": "5kW",
                    "rts_status": "DONE",
                    "national_portal_status": "DONE"
                },
                {
                    "name": "Kiran Cold Storage",
                    "phone": "9422001122",
                    "address": "Nanded Road Industrial Area, Beed",
                    "consumer_number": "BESCOM-5510293",
                    "discom_name": "BESCOM",
                    "category": "Commercial",
                    "agent_id": agent1.id if agent1 else None,
                    "inverter_capacity": "15kW",
                    "rts_status": "NOT_DONE",
                    "national_portal_status": "NOT_DONE"
                }
            ]

            for data in sample_consumers:
                c = Consumer(
                    name=data["name"],
                    phone=data["phone"],
                    address=data["address"],
                    consumer_number=data["consumer_number"],
                    discom_name=data["discom_name"],
                    category=data["category"],
                    agent_id=data["agent_id"],
                    created_by_id=admin.id if admin else None,
                    inverter_capacity=data["inverter_capacity"]
                )
                db.session.add(c)
                db.session.flush()

                s = ConsumerStatus(
                    consumer_id=c.id,
                    rts_status=data["rts_status"],
                    national_portal_status=data["national_portal_status"]
                )
                db.session.add(s)

                # Add sample documents
                d1 = ConsumerDocument(
                    consumer_id=c.id,
                    document_type="aadhar_front",
                    file_url="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80"
                )
                d2 = ConsumerDocument(
                    consumer_id=c.id,
                    document_type="plant_photo",
                    file_url="https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=600&q=80",
                    gps_lat=18.9892,
                    gps_long=75.7601
                )
                db.session.add_all([d1, d2])

                log = AuditLog(
                    consumer_id=c.id,
                    user_name="System Admin",
                    action="Initial Import",
                    details=f"Registered consumer {c.name} with RTS status {data['rts_status']}"
                )
                db.session.add(log)

            print(f"[OK] Seeded {len(sample_consumers)} Rooftop Solar Consumers.")

        db.session.commit()
        print("Database seeding completed successfully!")

if __name__ == '__main__':
    seed_database()
