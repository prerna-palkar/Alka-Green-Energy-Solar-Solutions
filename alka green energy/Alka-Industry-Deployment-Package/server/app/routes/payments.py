from flask import Blueprint, request, jsonify, g
from app.database import db
from app.models import Payment, Project
from app.middleware import token_required, admin_required, verify_customer_ownership

payments_bp = Blueprint('payments', __name__, url_prefix='/api')

@payments_bp.route('/customer/payments', methods=['GET'])
@token_required
def get_customer_payments():
    user = g.current_user
    if not user.customer:
        return jsonify({'status': 'error', 'message': 'No customer profile found.'}), 404

    # Fetch projects owned by customer
    projects = Project.query.filter_by(customer_id=user.customer.id).all()
    project_ids = [p.id for p in projects]

    if not project_ids:
        return jsonify({'status': 'success', 'payments': [], 'summary': {'total_cost': 0, 'total_paid': 0, 'pending': 0}}), 200

    payments = Payment.query.filter(Payment.project_id.in_(project_ids)).order_by(Payment.payment_date.desc()).all()

    total_cost = sum(p.total_project_cost for p in projects)
    total_paid = sum(p.total_amount_paid for p in projects)
    pending = sum(p.pending_amount for p in projects)

    return jsonify({
        'status': 'success',
        'summary': {
            'total_cost': total_cost,
            'total_paid': total_paid,
            'pending': pending
        },
        'payments': [pmt.to_dict() for pmt in payments]
    }), 200


@payments_bp.route('/admin/payments', methods=['GET'])
@admin_required
def list_admin_payments():
    payments = Payment.query.order_by(Payment.payment_date.desc()).all()
    return jsonify({
        'status': 'success',
        'count': len(payments),
        'payments': [p.to_dict() for p in payments]
    }), 200


@payments_bp.route('/admin/payments', methods=['POST'])
@admin_required
def record_admin_manual_payment():
    data = request.get_json() or {}

    project_id = data.get('project_id')
    amount = float(data.get('amount', 0.0))
    payment_method = data.get('payment_method', 'BANK_TRANSFER').upper()

    if not project_id or amount <= 0:
        return jsonify({'status': 'error', 'message': 'project_id and a positive amount are required.'}), 400

    valid_methods = ['CASH', 'UPI', 'BANK_TRANSFER', 'CHEQUE', 'OTHER']
    if payment_method not in valid_methods:
        return jsonify({'status': 'error', 'message': f'payment_method must be one of {valid_methods}'}), 400

    project = Project.query.get(project_id)
    if not project:
        return jsonify({'status': 'error', 'message': 'Project not found.'}), 404

    # Create Payment record
    payment = Payment(
        project_id=project_id,
        amount=amount,
        payment_method=payment_method,
        transaction_reference=data.get('transaction_reference', '').strip(),
        receipt_number=data.get('receipt_number', '').strip(),
        notes=data.get('notes', 'Manual payment entry recorded by admin.')
    )

    db.session.add(payment)
    db.session.flush()

    # Recalculate Project totals & payment status
    project.recalculate_payment_totals()
    db.session.commit()

    return jsonify({
        'status': 'success',
        'message': f'Manual payment of ₹{amount:,.2f} recorded successfully.',
        'payment': payment.to_dict(),
        'project_summary': {
            'total_project_cost': project.total_project_cost,
            'total_amount_paid': project.total_amount_paid,
            'pending_amount': project.pending_amount,
            'payment_status': project.payment_status
        }
    }), 201
