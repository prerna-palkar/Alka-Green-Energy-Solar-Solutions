from flask import Blueprint, request, jsonify
from app.database import db
from app.models import Enquiry
from app.middleware import admin_required

enquiries_bp = Blueprint('enquiries', __name__, url_prefix='/api')

@enquiries_bp.route('/enquiries', methods=['POST'])
def create_enquiry():
    data = request.get_json() or {}

    name = data.get('name', '').strip()
    phone = data.get('phone', '').strip()

    if not name or not phone:
        return jsonify({'status': 'error', 'message': 'Name and Phone number are required to submit an inquiry.'}), 400

    enquiry = Enquiry(
        name=name,
        phone=phone,
        email=data.get('email', '').strip(),
        location=data.get('location', '').strip(),
        customer_type=data.get('customerType', data.get('customer_type', 'residential')),
        monthly_bill=data.get('monthly_bill', '').strip(),
        company_name=data.get('company_name', '').strip(),
        industry_type=data.get('industry_type', '').strip(),
        power_requirement=data.get('power_requirement', '').strip(),
        requirement=data.get('requirement', '').strip(),
        message=data.get('message', '').strip(),
        source=data.get('source', 'Website Form'),
        status='NEW'
    )

    db.session.add(enquiry)
    db.session.commit()

    return jsonify({
        'status': 'success',
        'message': 'Thank you! Your solar inquiry has been received. Our expert from Jalna Road, Beed office will contact you shortly.',
        'data': enquiry.to_dict()
    }), 201


@enquiries_bp.route('/admin/enquiries', methods=['GET'])
@admin_required
def list_enquiries():
    status_filter = request.args.get('status')
    query = Enquiry.query

    if status_filter:
        query = query.filter_by(status=status_filter.upper())

    enquiries = query.order_by(Enquiry.created_at.desc()).all()
    return jsonify({
        'status': 'success',
        'count': len(enquiries),
        'enquiries': [e.to_dict() for e in enquiries]
    }), 200


@enquiries_bp.route('/admin/enquiries/<int:enquiry_id>', methods=['PUT'])
@admin_required
def update_enquiry_status(enquiry_id):
    enquiry = Enquiry.query.get_or_404(enquiry_id)
    data = request.get_json() or {}

    new_status = data.get('status', '').upper()
    if new_status not in ['NEW', 'CONTACTED', 'FOLLOW_UP', 'CONVERTED', 'CLOSED']:
        return jsonify({'status': 'error', 'message': 'Invalid enquiry status value.'}), 400

    enquiry.status = new_status
    db.session.commit()

    return jsonify({
        'status': 'success',
        'message': f'Enquiry status updated to {new_status}.',
        'enquiry': enquiry.to_dict()
    }), 200
