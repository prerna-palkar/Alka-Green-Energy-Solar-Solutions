import os
import uuid
from datetime import datetime
from flask import Blueprint, request, jsonify, g, current_app
from werkzeug.utils import secure_filename
from app.database import db
from app.models import User, Consumer, ConsumerStatus, ConsumerDocument, AuditLog
from app.middleware import token_required

consumers_bp = Blueprint('consumers', __name__, url_prefix='/api/consumers')

# Helper to record audit log
def record_audit_log(consumer_id, action, details=None):
    user = getattr(g, 'current_user', None)
    log = AuditLog(
        consumer_id=consumer_id,
        user_id=user.id if user else None,
        user_name=user.name if user else 'System',
        action=action,
        details=details
    )
    db.session.add(log)


@consumers_bp.route('', methods=['GET'])
@token_required
def get_consumers():
    search = request.args.get('search', '').strip()
    rts_status = request.args.get('rts_status', '').strip().upper()
    np_status = request.args.get('np_status', '').strip().upper()
    agent_id = request.args.get('agent_id', type=int)
    category = request.args.get('category', '').strip()
    discom = request.args.get('discom', '').strip()

    query = Consumer.query.join(ConsumerStatus, Consumer.id == ConsumerStatus.consumer_id, isouter=True)

    # Search filter by name, phone, consumer_number
    if search:
        search_pattern = f"%{search}%"
        query = query.filter(
            (Consumer.name.ilike(search_pattern)) |
            (Consumer.phone.ilike(search_pattern)) |
            (Consumer.consumer_number.ilike(search_pattern)) |
            (Consumer.discom_name.ilike(search_pattern))
        )

    if rts_status in ['DONE', 'NOT_DONE']:
        query = query.filter(ConsumerStatus.rts_status == rts_status)

    if np_status in ['DONE', 'NOT_DONE']:
        query = query.filter(ConsumerStatus.national_portal_status == np_status)

    if agent_id:
        query = query.filter(Consumer.agent_id == agent_id)

    if category:
        query = query.filter(Consumer.category.ilike(category))

    if discom:
        query = query.filter(Consumer.discom_name.ilike(discom))

    consumers = query.order_by(Consumer.created_at.desc()).all()

    return jsonify({
        'status': 'success',
        'count': len(consumers),
        'consumers': [c.to_dict() for c in consumers]
    }), 200


@consumers_bp.route('/<int:consumer_id>', methods=['GET'])
@token_required
def get_consumer_details(consumer_id):
    consumer = Consumer.query.get_or_404(consumer_id)
    audit_logs = AuditLog.query.filter_by(consumer_id=consumer_id).order_by(AuditLog.timestamp.desc()).all()
    
    data = consumer.to_dict()
    data['audit_trail'] = [log.to_dict() for log in audit_logs]
    
    return jsonify({
        'status': 'success',
        'consumer': data
    }), 200


@consumers_bp.route('', methods=['POST'])
@token_required
def add_consumer():
    data = request.get_json() or {}
    
    name = data.get('name', '').strip()
    phone = data.get('phone', '').strip()
    consumer_number = data.get('consumer_number', '').strip()
    discom_name = data.get('discom_name', 'MSEDCL').strip()
    category = data.get('category', 'Residential').strip()
    address = data.get('address', '').strip()
    agent_id = data.get('agent_id')
    inverter_capacity = data.get('inverter_capacity', '3kW').strip()

    if not name or not phone or not consumer_number:
        return jsonify({'status': 'error', 'message': 'Consumer Name, Mobile Phone, and Consumer Number are required.'}), 400

    # Duplicate check for consumer_number
    if Consumer.query.filter_by(consumer_number=consumer_number).first():
        return jsonify({'status': 'error', 'message': f'Consumer number {consumer_number} is already registered.'}), 409

    current_user = g.current_user
    assigned_agent_id = agent_id if agent_id else current_user.id

    new_consumer = Consumer(
        name=name,
        phone=phone,
        consumer_number=consumer_number,
        discom_name=discom_name,
        category=category,
        address=address,
        agent_id=assigned_agent_id,
        created_by_id=current_user.id,
        inverter_capacity=inverter_capacity
    )

    db.session.add(new_consumer)
    db.session.flush()

    # Create status entry
    status = ConsumerStatus(
        consumer_id=new_consumer.id,
        rts_status='NOT_DONE',
        national_portal_status='NOT_DONE'
    )
    db.session.add(status)

    record_audit_log(new_consumer.id, "Registered Consumer", f"Created consumer {new_consumer.name} ({new_consumer.consumer_number})")
    
    db.session.commit()

    return jsonify({
        'status': 'success',
        'message': 'Consumer registered successfully.',
        'consumer': new_consumer.to_dict()
    }), 201


@consumers_bp.route('/<int:consumer_id>', methods=['PUT'])
@token_required
def update_consumer(consumer_id):
    consumer = Consumer.query.get_or_404(consumer_id)
    data = request.get_json() or {}

    if 'name' in data: consumer.name = data['name'].strip()
    if 'phone' in data: consumer.phone = data['phone'].strip()
    if 'address' in data: consumer.address = data['address'].strip()
    if 'discom_name' in data: consumer.discom_name = data['discom_name'].strip()
    if 'category' in data: consumer.category = data['category'].strip()
    if 'agent_id' in data: consumer.agent_id = data['agent_id']
    if 'inverter_capacity' in data: consumer.inverter_capacity = data['inverter_capacity'].strip()

    record_audit_log(consumer.id, "Updated Consumer Profile", f"Updated details for {consumer.name}")

    db.session.commit()

    return jsonify({
        'status': 'success',
        'message': 'Consumer updated successfully.',
        'consumer': consumer.to_dict()
    }), 200


@consumers_bp.route('/<int:consumer_id>/rts-status', methods=['PATCH'])
@token_required
def toggle_rts_status(consumer_id):
    consumer = Consumer.query.get_or_404(consumer_id)
    data = request.get_json() or {}
    
    new_status = data.get('rts_status', '').upper()
    if new_status not in ['DONE', 'NOT_DONE']:
        # Toggle current
        new_status = 'DONE' if consumer.status.rts_status == 'NOT_DONE' else 'NOT_DONE'

    consumer.status.rts_status = new_status
    record_audit_log(consumer.id, f"Changed RTS Status to {new_status}", f"Internal Rooftop Solar status set to {new_status}")
    db.session.commit()

    return jsonify({
        'status': 'success',
        'rts_status': new_status,
        'consumer': consumer.to_dict()
    }), 200


@consumers_bp.route('/<int:consumer_id>/national-portal-status', methods=['PATCH'])
@token_required
def toggle_national_portal_status(consumer_id):
    consumer = Consumer.query.get_or_404(consumer_id)
    data = request.get_json() or {}

    new_status = data.get('national_portal_status', '').upper()
    if new_status not in ['DONE', 'NOT_DONE']:
        new_status = 'DONE' if consumer.status.national_portal_status == 'NOT_DONE' else 'NOT_DONE'

    consumer.status.national_portal_status = new_status
    record_audit_log(consumer.id, f"Changed National Portal Status to {new_status}", f"Government PM Surya Ghar portal status set to {new_status}")
    db.session.commit()

    return jsonify({
        'status': 'success',
        'national_portal_status': new_status,
        'consumer': consumer.to_dict()
    }), 200


@consumers_bp.route('/<int:consumer_id>/documents', methods=['POST'])
@token_required
def upload_consumer_document(consumer_id):
    consumer = Consumer.query.get_or_404(consumer_id)
    
    document_type = request.form.get('document_type', 'plant_photo')
    capacity_kw = request.form.get('capacity_kw')
    gps_lat = request.form.get('gps_lat', type=float)
    gps_long = request.form.get('gps_long', type=float)

    file = request.files.get('file')
    file_url = request.form.get('file_url')

    if file:
        filename = secure_filename(file.filename)
        ext = filename.rsplit('.', 1)[1].lower() if '.' in filename else 'jpg'
        unique_name = f"{consumer_id}_{document_type}_{uuid.uuid4().hex[:8]}.{ext}"
        
        upload_folder = os.path.join(current_app.root_path, 'static', 'uploads')
        os.makedirs(upload_folder, exist_ok=True)
        
        save_path = os.path.join(upload_folder, unique_name)
        file.save(save_path)
        file_url = f"/static/uploads/{unique_name}"

    if not file_url:
        # Fallback dummy placeholder for simulated uploads
        file_url = f"https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=600&q=80"

    doc = ConsumerDocument(
        consumer_id=consumer_id,
        document_type=document_type,
        file_url=file_url,
        capacity_kw=capacity_kw or consumer.inverter_capacity,
        gps_lat=gps_lat,
        gps_long=gps_long
    )

    db.session.add(doc)
    
    details_str = f"Uploaded {document_type}"
    if gps_lat and gps_long:
        details_str += f" with GPS geotag ({gps_lat:.4f}, {gps_long:.4f})"
    
    record_audit_log(consumer_id, f"Uploaded {document_type.replace('_', ' ').title()}", details_str)
    db.session.commit()

    return jsonify({
        'status': 'success',
        'message': 'Document uploaded successfully.',
        'document': doc.to_dict(),
        'consumer': consumer.to_dict()
    }), 201


@consumers_bp.route('/batch-sync', methods=['POST'])
@token_required
def batch_sync_offline_queue():
    data = request.get_json() or {}
    items = data.get('items', [])
    synced_results = []

    for item in items:
        action_type = item.get('action')
        payload = item.get('payload', {})

        if action_type == 'ADD_CONSUMER':
            c_num = payload.get('consumer_number')
            existing = Consumer.query.filter_by(consumer_number=c_num).first() if c_num else None
            if not existing:
                c = Consumer(
                    name=payload.get('name'),
                    phone=payload.get('phone'),
                    consumer_number=c_num,
                    discom_name=payload.get('discom_name', 'MSEDCL'),
                    category=payload.get('category', 'Residential'),
                    address=payload.get('address'),
                    agent_id=g.current_user.id,
                    created_by_id=g.current_user.id
                )
                db.session.add(c)
                db.session.flush()
                db.session.add(ConsumerStatus(consumer_id=c.id, rts_status='NOT_DONE', national_portal_status='NOT_DONE'))
                record_audit_log(c.id, "Offline Sync - Added Consumer", f"Consumer {c.name} synced from field offline queue.")
                synced_results.append({'id': item.get('local_id'), 'status': 'synced', 'server_id': c.id})

        elif action_type == 'TOGGLE_RTS':
            c_id = payload.get('consumer_id')
            c = Consumer.query.get(c_id)
            if c:
                c.status.rts_status = payload.get('status', 'DONE')
                record_audit_log(c.id, "Offline Sync - RTS Status", f"Set RTS status to {c.status.rts_status}")
                synced_results.append({'id': item.get('local_id'), 'status': 'synced'})

        elif action_type == 'TOGGLE_NP':
            c_id = payload.get('consumer_id')
            c = Consumer.query.get(c_id)
            if c:
                c.status.national_portal_status = payload.get('status', 'DONE')
                record_audit_log(c.id, "Offline Sync - NP Status", f"Set NP status to {c.status.national_portal_status}")
                synced_results.append({'id': item.get('local_id'), 'status': 'synced'})

    db.session.commit()

    return jsonify({
        'status': 'success',
        'message': f'Successfully synced {len(synced_results)} offline queued items.',
        'synced_items': synced_results
    }), 200
