from flask import Blueprint, request, jsonify, g
from sqlalchemy import func
from app.database import db
from app.models import (
    User, Customer, Project, Payment, Enquiry,
    ProjectStatusHistory, Document, ProjectImage, Gallery,
    GovernmentScheme, ChatbotFAQ
)
from app.middleware import admin_required

admin_bp = Blueprint('admin_api', __name__, url_prefix='/api/admin')

# ----------------------------------------------------
# 1. OVERVIEW DASHBOARD STATS & RECHARTS DATA
# ----------------------------------------------------
@admin_bp.route('/stats', methods=['GET'])
@admin_required
def get_dashboard_stats():
    total_customers = Customer.query.count()
    total_projects = Project.query.count()
    
    # Active vs Completed Projects
    active_projects = Project.query.filter(Project.status != 'COMPLETED').count()
    completed_projects = Project.query.filter_by(status='COMPLETED').count()

    # Financial Totals
    financials = db.session.query(
        func.sum(Project.total_project_cost),
        func.sum(Project.total_amount_paid),
        func.sum(Project.pending_amount)
    ).first()

    total_value = float(financials[0] or 0.0)
    total_received = float(financials[1] or 0.0)
    total_pending = float(financials[2] or 0.0)

    # New Enquiries
    new_enquiries = Enquiry.query.filter_by(status='NEW').count()

    # Chart 1: Project Status Breakdown
    statuses = ['ENQUIRY', 'SITE_VISIT', 'QUOTATION', 'APPROVED', 'INSTALLATION_SCHEDULED', 'INSTALLATION_IN_PROGRESS', 'INSTALLED', 'COMPLETED']
    status_counts = []
    for st in statuses:
        cnt = Project.query.filter_by(status=st).count()
        status_counts.append({'status': st, 'label': st.replace('_', ' ').title(), 'count': cnt})

    # Chart 2: Customer Types Breakdown
    customer_types = ['residential', 'commercial', 'industrial']
    type_counts = []
    for ct in customer_types:
        cnt = Customer.query.filter_by(customer_type=ct).count()
        type_counts.append({'type': ct, 'label': ct.capitalize(), 'count': cnt})

    return jsonify({
        'status': 'success',
        'summary': {
            'total_customers': total_customers,
            'total_projects': total_projects,
            'active_projects': active_projects,
            'completed_projects': completed_projects,
            'total_project_value': total_value,
            'total_amount_received': total_received,
            'total_pending_amount': total_pending,
            'new_enquiries': new_enquiries
        },
        'charts': {
            'project_status': status_counts,
            'customer_types': type_counts,
            'financial_overview': [
                {'name': 'Total Value', 'amount': total_value},
                {'name': 'Amount Received', 'amount': total_received},
                {'name': 'Pending Amount', 'amount': total_pending}
            ]
        }
    }), 200


# ----------------------------------------------------
# 2. CUSTOMER MANAGEMENT APIs (Paginated)
# ----------------------------------------------------
@admin_bp.route('/customers', methods=['GET'])
@admin_required
def list_customers():
    page = request.args.get('page', 1, type=int)
    limit = request.args.get('limit', 10, type=int)
    search = request.args.get('search', '').strip()
    customer_type = request.args.get('customer_type', '').strip()

    query = Customer.query.join(User)

    if search:
        search_fmt = f"%{search}%"
        query = query.filter(
            (User.name.ilike(search_fmt)) |
            (User.email.ilike(search_fmt)) |
            (User.phone.ilike(search_fmt)) |
            (Customer.company_name.ilike(search_fmt))
        )

    if customer_type:
        query = query.filter(Customer.customer_type == customer_type)

    paginated = query.order_by(Customer.created_at.desc()).paginate(page=page, per_page=limit, error_out=False)

    results = []
    for c in paginated.items:
        c_dict = c.to_dict()
        c_dict['user'] = c.user.to_dict()
        c_dict['project_count'] = len(c.projects)
        results.append(c_dict)

    return jsonify({
        'status': 'success',
        'customers': results,
        'pagination': {
            'page': paginated.page,
            'limit': limit,
            'total': paginated.total,
            'total_pages': paginated.pages
        }
    }), 200


@admin_bp.route('/customers', methods=['POST'])
@admin_required
def create_customer():
    data = request.get_json() or {}

    name = data.get('name', '').strip()
    email = data.get('email', '').strip().lower()
    phone = data.get('phone', '').strip()
    password = data.get('password', 'Customer@123').strip()

    if not name or not email or not phone:
        return jsonify({'status': 'error', 'message': 'Name, email, and phone are required.'}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({'status': 'error', 'message': 'Email address is already in use.'}), 409

    if User.query.filter_by(phone=phone).first():
        return jsonify({'status': 'error', 'message': 'Phone number is already in use.'}), 409

    # Create User
    user = User(name=name, email=email, phone=phone, role='USER')
    user.set_password(password)
    db.session.add(user)
    db.session.flush()

    # Create Customer
    customer = Customer(
        user_id=user.id,
        company_name=data.get('company_name', '').strip(),
        customer_type=data.get('customer_type', 'residential'),
        address=data.get('address', '').strip(),
        city=data.get('city', 'Beed'),
        state=data.get('state', 'Maharashtra'),
        postal_code=data.get('postal_code', '431122'),
        notes=data.get('notes', '').strip()
    )
    db.session.add(customer)
    db.session.commit()

    c_dict = customer.to_dict()
    c_dict['user'] = user.to_dict()

    return jsonify({'status': 'success', 'message': 'Customer profile created successfully.', 'customer': c_dict}), 201


@admin_bp.route('/customers/<int:customer_id>', methods=['GET'])
@admin_required
def get_customer_detail(customer_id):
    customer = Customer.query.get_or_404(customer_id)
    c_dict = customer.to_dict()
    c_dict['user'] = customer.user.to_dict()
    c_dict['projects'] = [p.to_dict() for p in customer.projects]
    c_dict['documents'] = [d.to_dict() for d in customer.documents]

    # Gather all payments across customer's projects
    project_ids = [p.id for p in customer.projects]
    payments = Payment.query.filter(Payment.project_id.in_(project_ids)).order_by(Payment.payment_date.desc()).all() if project_ids else []
    c_dict['payments'] = [p.to_dict() for p in payments]

    return jsonify({'status': 'success', 'customer': c_dict}), 200


@admin_bp.route('/customers/<int:customer_id>', methods=['PUT'])
@admin_required
def update_customer(customer_id):
    customer = Customer.query.get_or_404(customer_id)
    user = customer.user
    data = request.get_json() or {}

    if 'name' in data: user.name = data['name'].strip()
    if 'phone' in data: user.phone = data['phone'].strip()
    if 'company_name' in data: customer.company_name = data['company_name'].strip()
    if 'customer_type' in data: customer.customer_type = data['customer_type']
    if 'address' in data: customer.address = data['address'].strip()
    if 'city' in data: customer.city = data['city'].strip()
    if 'notes' in data: customer.notes = data['notes'].strip()

    db.session.commit()
    c_dict = customer.to_dict()
    c_dict['user'] = user.to_dict()
    return jsonify({'status': 'success', 'message': 'Customer updated.', 'customer': c_dict}), 200


@admin_bp.route('/customers/<int:customer_id>', methods=['DELETE'])
@admin_required
def delete_customer(customer_id):
    customer = Customer.query.get_or_404(customer_id)
    user = customer.user
    db.session.delete(customer)
    db.session.delete(user)
    db.session.commit()
    return jsonify({'status': 'success', 'message': 'Customer and user account deleted.'}), 200


# ----------------------------------------------------
# 3. PROJECT MANAGEMENT APIs (Paginated)
# ----------------------------------------------------
@admin_bp.route('/projects', methods=['GET'])
@admin_required
def list_projects_paginated():
    page = request.args.get('page', 1, type=int)
    limit = request.args.get('limit', 10, type=int)
    search = request.args.get('search', '').strip()
    project_type = request.args.get('project_type', '').strip()
    status = request.args.get('status', '').strip()
    payment_status = request.args.get('payment_status', '').strip()

    query = Project.query.join(Customer).join(User)

    if search:
        fmt = f"%{search}%"
        query = query.filter(
            (Project.project_name.ilike(fmt)) |
            (User.name.ilike(fmt)) |
            (Project.location.ilike(fmt))
        )

    if project_type: query = query.filter(Project.project_type == project_type)
    if status: query = query.filter(Project.status == status)
    if payment_status: query = query.filter(Project.payment_status == payment_status)

    paginated = query.order_by(Project.created_at.desc()).paginate(page=page, per_page=limit, error_out=False)

    results = []
    for p in paginated.items:
        p_dict = p.to_dict()
        p_dict['customer_name'] = p.customer.user.name if p.customer and p.customer.user else "Unknown"
        results.append(p_dict)

    return jsonify({
        'status': 'success',
        'projects': results,
        'pagination': {
            'page': paginated.page,
            'limit': limit,
            'total': paginated.total,
            'total_pages': paginated.pages
        }
    }), 200


# ----------------------------------------------------
# 4. GALLERY ADMIN APIs
# ----------------------------------------------------
@admin_bp.route('/gallery', methods=['GET'])
@admin_required
def list_admin_gallery():
    items = Gallery.query.order_by(Gallery.created_at.desc()).all()
    return jsonify({'status': 'success', 'items': [i.to_dict() for i in items]}), 200


@admin_bp.route('/gallery', methods=['POST'])
@admin_required
def create_gallery_item():
    data = request.get_json() or {}
    title = data.get('title', '').strip()
    image_url = data.get('image_url', '').strip()

    if not title or not image_url:
        return jsonify({'status': 'error', 'message': 'Title and Image URL are required.'}), 400

    item = Gallery(
        title=title,
        category=data.get('category', 'residential'),
        capacity=data.get('capacity', 'N/A'),
        location=data.get('location', 'Beed'),
        image_url=image_url,
        caption=data.get('caption', ''),
        is_active=bool(data.get('is_active', True))
    )
    db.session.add(item)
    db.session.commit()
    return jsonify({'status': 'success', 'item': item.to_dict()}), 201


@admin_bp.route('/gallery/<int:item_id>', methods=['DELETE'])
@admin_required
def delete_gallery_item(item_id):
    item = Gallery.query.get_or_404(item_id)
    db.session.delete(item)
    db.session.commit()
    return jsonify({'status': 'success', 'message': 'Gallery item deleted.'}), 200


# ----------------------------------------------------
# 5. DOCUMENTS ADMIN APIs
# ----------------------------------------------------
@admin_bp.route('/documents', methods=['GET'])
@admin_required
def list_admin_documents():
    documents = Document.query.order_by(Document.uploaded_at.desc()).all()
    return jsonify({'status': 'success', 'documents': [d.to_dict() for d in documents]}), 200
