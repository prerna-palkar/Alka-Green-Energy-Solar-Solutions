import os
from flask import Flask, jsonify
from flask_cors import CORS
from app.config import Config
from app.database import db

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    # Initialize Extensions
    db.init_app(app)

    # Configure CORS
    CORS(
        app,
        resources={r"/api/*": {"origins": [app.config['FRONTEND_URL'], "http://localhost:5173", "http://localhost:3000"]}},
        supports_credentials=True
    )

    # Register Blueprints
    from app.routes.auth import auth_bp
    from app.routes.consumers import consumers_bp
    from app.routes.enquiries import enquiries_bp
    from app.routes.projects import projects_bp
    from app.routes.payments import payments_bp
    from app.routes.schemes import schemes_bp
    from app.routes.faqs import faqs_bp
    from app.routes.admin import admin_bp

    app.register_blueprint(auth_bp)
    app.register_blueprint(consumers_bp)
    app.register_blueprint(enquiries_bp)
    app.register_blueprint(projects_bp)
    app.register_blueprint(payments_bp)
    app.register_blueprint(schemes_bp)
    app.register_blueprint(faqs_bp)
    app.register_blueprint(admin_bp)

    # Health Check Endpoint
    @app.route('/api/health', methods=['GET'])
    def health_check():
        return jsonify({
            'status': 'ok',
            'business': 'Alka Green Energy Solar Solutions',
            'address': 'Opp. John Deere Tractor Showroom, Jalna Road, Beed',
            'mobile': '+91 95959 11226',
            'message': 'Backend REST API is operational'
        }), 200

    # Global Error Handlers (Clean JSON, zero stack trace leak)
    @app.errorhandler(400)
    def bad_request_error(error):
        return jsonify({'status': 'error', 'message': 'Bad Request. Invalid request payload.'}), 400

    @app.errorhandler(401)
    def unauthorized_error(error):
        return jsonify({'status': 'error', 'message': 'Unauthorized. Authentication token is missing or invalid.'}), 401

    @app.errorhandler(403)
    def forbidden_error(error):
        return jsonify({'status': 'error', 'message': 'Forbidden. You do not have permission to access this resource.'}), 403

    @app.errorhandler(404)
    def not_found_error(error):
        return jsonify({'status': 'error', 'message': 'Requested API endpoint not found.'}), 404

    @app.errorhandler(500)
    def internal_error(error):
        return jsonify({'status': 'error', 'message': 'Internal Server Error. Please contact backend administrator.'}), 500

    # Create Database Tables
    with app.app_context():
        try:
            db.create_all()
        except Exception as e:
            # Fallback to SQLite if local MySQL is unreachable
            print(f"[Database Warning] MySQL connection failed ({e}). Falling back to local SQLite database.")
            sqlite_uri = "sqlite:///" + os.path.join(app.root_path, "..", "alka_solar.db")
            app.config["SQLALCHEMY_DATABASE_URI"] = sqlite_uri
            db.create_all()

    return app
