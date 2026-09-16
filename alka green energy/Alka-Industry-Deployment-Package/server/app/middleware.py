import jwt
from functools import wraps
from flask import request, jsonify, g, current_app
from app.models import User

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        auth_header = request.headers.get('Authorization')

        if auth_header:
            parts = auth_header.split()
            if len(parts) == 2 and parts[0].lower() == 'bearer':
                token = parts[1]

        if not token:
            return jsonify({'status': 'error', 'message': 'Authentication token is missing. Please log in.'}), 401

        try:
            payload = jwt.decode(
                token,
                current_app.config['JWT_SECRET_KEY'],
                algorithms=['HS256']
            )
            user_id = payload.get('user_id')
            user = User.query.get(user_id)

            if not user or not user.is_active:
                return jsonify({'status': 'error', 'message': 'Invalid token or inactive user account.'}), 401

            g.current_user = user
        except jwt.ExpiredSignatureError:
            return jsonify({'status': 'error', 'message': 'Authentication token has expired. Please log in again.'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'status': 'error', 'message': 'Invalid authentication token.'}), 401

        return f(*args, **kwargs)
    return decorated


def admin_required(f):
    @wraps(f)
    @token_required
    def decorated(*args, **kwargs):
        if not hasattr(g, 'current_user') or g.current_user.role != 'ADMIN':
            return jsonify({
                'status': 'error',
                'message': 'Access forbidden. Administrator privileges required.'
            }), 403
        return f(*args, **kwargs)
    return decorated


def verify_customer_ownership(target_customer_id):
    """
    Backend Security Check:
    Returns True if current user is ADMIN or if target_customer_id matches current user's customer profile.
    Returns False if a normal user attempts to access another customer's data.
    """
    if not hasattr(g, 'current_user') or g.current_user is None:
        return False

    # Admin is granted administrative access
    if g.current_user.role == 'ADMIN':
        return True

    # Check if user has customer profile and owns target_customer_id
    if g.current_user.customer and g.current_user.customer.id == target_customer_id:
        return True

    return False
