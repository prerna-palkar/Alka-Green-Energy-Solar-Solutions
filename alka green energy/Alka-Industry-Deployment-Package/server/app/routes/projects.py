from flask import Blueprint, request, jsonify, g
from app.database import db
from app.models import Project, Customer, ProjectStatusHistory
from app.middleware import token_required, admin_required, verify_customer_ownership

projects_bp = Blueprint('projects', __name__, url_prefix='/api')

@projects_bp.route('/customer/project', methods=['GET'])
@token_required
def get_my_customer_project():
    user = g.current_user
    if not user.customer:
        return jsonify({'status': 'error', 'message': 'No customer profile associated with this account.'}), 404

    # Fetch projects for this customer
    project = Project.query.filter_by(customer_id=user.customer.id).order_by(Project.created_at.desc()).first()
    if not project:
        return jsonify({'status': 'error', 'message': 'No project records found for your account.'}), 404

    return jsonify({
        'status': 'success',
        'project': project.to_dict(),
        'status_history': [h.to_dict() for h in project.status_history]
    }), 200


@projects_bp.route('/projects/<int:project_id>', methods=['GET'])
@token_required
def get_project_by_id(project_id):
    project = Project.query.get(project_id)
    if not project:
        return jsonify({'status': 'error', 'message': 'Project not found.'}), 404

    # Mandatory Backend Ownership Verification Check
    if not verify_customer_ownership(project.customer_id):
        return jsonify({
            'status': 'error',
            'message': 'Access forbidden. You do not have authorization to view this project record.'
        }), 403

    return jsonify({
        'status': 'success',
        'project': project.to_dict(),
        'status_history': [h.to_dict() for h in project.status_history]
    }), 200


@projects_bp.route('/admin/projects', methods=['GET'])
@admin_required
def list_admin_projects():
    projects = Project.query.order_by(Project.created_at.desc()).all()
    return jsonify({
        'status': 'success',
        'count': len(projects),
        'projects': [p.to_dict() for p in projects]
    }), 200


@projects_bp.route('/admin/projects', methods=['POST'])
@admin_required
def create_admin_project():
    data = request.get_json() or {}

    customer_id = data.get('customer_id')
    project_name = data.get('project_name', '').strip()
    capacity = data.get('capacity', '').strip()
    total_project_cost = float(data.get('total_project_cost', 0.0))

    if not customer_id or not project_name or not capacity:
        return jsonify({'status': 'error', 'message': 'customer_id, project_name, and capacity are required.'}), 400

    customer = Customer.query.get(customer_id)
    if not customer:
        return jsonify({'status': 'error', 'message': 'Specified customer_id does not exist.'}), 404

    project = Project(
        customer_id=customer_id,
        project_name=project_name,
        location=data.get('location', 'Beed, Maharashtra'),
        project_type=data.get('project_type', 'residential'),
        capacity=capacity,
        description=data.get('description', ''),
        status=data.get('status', 'ENQUIRY'),
        total_project_cost=total_project_cost,
        pending_amount=total_project_cost,
        payment_status='UNPAID'
    )

    db.session.add(project)
    db.session.flush()

    # Initial history entry
    history = ProjectStatusHistory(
        project_id=project.id,
        previous_status=None,
        new_status=project.status,
        changed_by_user_id=g.current_user.id,
        notes='Initial project record created by administrator.'
    )
    db.session.add(history)
    db.session.commit()

    return jsonify({
        'status': 'success',
        'message': 'Project created successfully.',
        'project': project.to_dict()
    }), 201


@projects_bp.route('/admin/projects/<int:project_id>', methods=['PUT'])
@admin_required
def update_admin_project(project_id):
    project = Project.query.get_or_404(project_id)
    data = request.get_json() or {}

    old_status = project.status
    new_status = data.get('status')

    if 'project_name' in data:
        project.project_name = data['project_name'].strip()
    if 'total_project_cost' in data:
        project.total_project_cost = float(data['total_project_cost'])
        project.recalculate_payment_totals()
    if 'description' in data:
        project.description = data['description']

    # Handle status change history logging
    if new_status and new_status != old_status:
        project.status = new_status
        history_entry = ProjectStatusHistory(
            project_id=project.id,
            previous_status=old_status,
            new_status=new_status,
            changed_by_user_id=g.current_user.id,
            notes=data.get('status_notes', f'Status updated to {new_status}')
        )
        db.session.add(history_entry)

    db.session.commit()

    return jsonify({
        'status': 'success',
        'message': 'Project updated successfully.',
        'project': project.to_dict()
    }), 200
