import datetime
import jwt
from flask import Blueprint, request, jsonify, g, current_app
from app.database import db
from app.models import User, Customer
from app.middleware import token_required

auth_bp = Blueprint('auth', __name__, url_prefix='/api/auth')

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json() or {}
    
    name = data.get('name', '').strip()
    email = data.get('email', '').strip().lower()
    phone = data.get('phone', '').strip()
    password = data.get('password', '').strip()
    role = data.get('role', 'USER').upper()

    # Input validation
    if not name or not email or not phone or not password:
        return jsonify({'status': 'error', 'message': 'Name, email, phone, and password are required fields.'}), 400

    if len(phone) < 10:
        return jsonify({'status': 'error', 'message': 'Please provide a valid 10-digit mobile number.'}), 400

    if len(password) < 6:
        return jsonify({'status': 'error', 'message': 'Password must be at least 6 characters long.'}), 400

    # Check duplicate email
    if User.query.filter_by(email=email).first():
        return jsonify({'status': 'error', 'message': 'An account with this email address already exists.'}), 409

    # Check duplicate phone
    if User.query.filter_by(phone=phone).first():
        return jsonify({'status': 'error', 'message': 'An account with this mobile phone number already exists.'}), 409

    # Create User
    new_user = User(
        name=name,
        email=email,
        phone=phone,
        role='ADMIN' if role == 'ADMIN' else 'USER'
    )
    new_user.set_password(password)

    db.session.add(new_user)
    db.session.flush() # Populate user ID

    # Create corresponding Customer profile
    if new_user.role == 'USER':
        new_customer = Customer(
            user_id=new_user.id,
            company_name=data.get('company_name'),
            customer_type=data.get('customer_type', 'residential'),
            address=data.get('address'),
            city=data.get('city', 'Beed')
        )
        db.session.add(new_customer)

    db.session.commit()

    # Generate JWT Token
    token_payload = {
        'user_id': new_user.id,
        'email': new_user.email,
        'role': new_user.role,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(days=7)
    }
    token = jwt.encode(token_payload, current_app.config['JWT_SECRET_KEY'], algorithm='HS256')

    return jsonify({
        'status': 'success',
        'message': 'Account registered successfully.',
        'token': token,
        'user': new_user.to_dict()
    }), 201


@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json() or {}
    
    email = data.get('email', '').strip().lower()
    password = data.get('password', '').strip()

    if not email or not password:
        return jsonify({'status': 'error', 'message': 'Email and password are required.'}), 400

    user = User.query.filter_by(email=email).first()

    if not user or not user.check_password(password):
        return jsonify({'status': 'error', 'message': 'Invalid email or password credentials.'}), 401

    if not user.is_active:
        return jsonify({'status': 'error', 'message': 'Account is deactivated. Please contact support.'}), 401

    # Issue JWT token
    token_payload = {
        'user_id': user.id,
        'email': user.email,
        'role': user.role,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(days=7)
    }
    token = jwt.encode(token_payload, current_app.config['JWT_SECRET_KEY'], algorithm='HS256')

    response_data = {
        'status': 'success',
        'message': 'Login successful.',
        'token': token,
        'user': user.to_dict()
    }
    
    if user.customer:
        response_data['customer'] = user.customer.to_dict()

    return jsonify(response_data), 200


@auth_bp.route('/logout', methods=['POST'])
def logout():
    return jsonify({'status': 'success', 'message': 'Logged out successfully.'}), 200


@auth_bp.route('/me', methods=['GET'])
@token_required
def get_me():
    user = g.current_user
    data = {
        'status': 'success',
        'user': user.to_dict()
    }
    if user.customer:
        data['customer'] = user.customer.to_dict()
    return jsonify(data), 200
