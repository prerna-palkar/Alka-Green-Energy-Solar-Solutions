from flask import Blueprint, request, jsonify
from app.database import db
from app.models import GovernmentScheme
from app.middleware import admin_required

schemes_bp = Blueprint('schemes', __name__, url_prefix='/api')

@schemes_bp.route('/government-schemes', methods=['GET'])
def get_public_schemes():
    schemes = GovernmentScheme.query.filter_by(is_active=True).order_by(GovernmentScheme.created_at.desc()).all()
    return jsonify({
        'status': 'success',
        'count': len(schemes),
        'schemes': [s.to_dict() for s in schemes]
    }), 200


@schemes_bp.route('/admin/government-schemes', methods=['POST'])
@admin_required
def create_admin_scheme():
    data = request.get_json() or {}

    title = data.get('title', '').strip()
    authority = data.get('authority', '').strip()
    summary = data.get('summary', '').strip()

    if not title or not authority or not summary:
        return jsonify({'status': 'error', 'message': 'Title, authority, and summary are required.'}), 400

    scheme = GovernmentScheme(
        title=title,
        authority=authority,
        summary=summary,
        eligibility=data.get('eligibility'),
        benefits=data.get('benefits'),
        required_documents=data.get('required_documents'),
        application_process=data.get('application_process'),
        official_link=data.get('official_link')
    )

    db.session.add(scheme)
    db.session.commit()

    return jsonify({
        'status': 'success',
        'message': 'Government scheme record created.',
        'scheme': scheme.to_dict()
    }), 201


@schemes_bp.route('/admin/government-schemes/<int:scheme_id>', methods=['PUT'])
@admin_required
def update_admin_scheme(scheme_id):
    scheme = GovernmentScheme.query.get_or_404(scheme_id)
    data = request.get_json() or {}

    if 'title' in data: scheme.title = data['title'].strip()
    if 'authority' in data: scheme.authority = data['authority'].strip()
    if 'summary' in data: scheme.summary = data['summary'].strip()
    if 'official_link' in data: scheme.official_link = data['official_link'].strip()
    if 'is_active' in data: scheme.is_active = bool(data['is_active'])

    db.session.commit()
    return jsonify({'status': 'success', 'scheme': scheme.to_dict()}), 200


@schemes_bp.route('/admin/government-schemes/<int:scheme_id>', methods=['DELETE'])
@admin_required
def delete_admin_scheme(scheme_id):
    scheme = GovernmentScheme.query.get_or_404(scheme_id)
    db.session.delete(scheme)
    db.session.commit()
    return jsonify({'status': 'success', 'message': 'Scheme deleted successfully.'}), 200
