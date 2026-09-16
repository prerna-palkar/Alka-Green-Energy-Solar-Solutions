from flask import Blueprint, request, jsonify
from app.database import db
from app.models import ChatbotFAQ
from app.middleware import admin_required

faqs_bp = Blueprint('faqs', __name__, url_prefix='/api')

@faqs_bp.route('/faqs', methods=['GET'])
def get_faqs():
    category = request.args.get('category')
    query = ChatbotFAQ.query.filter_by(is_active=True)

    if category and category != 'all':
        query = query.filter_by(category=category.lower())

    faqs = query.all()
    return jsonify({
        'status': 'success',
        'count': len(faqs),
        'faqs': [f.to_dict() for f in faqs]
    }), 200


@faqs_bp.route('/admin/faqs', methods=['POST'])
@admin_required
def create_faq():
    data = request.get_json() or {}
    question = data.get('question', '').strip()
    answer = data.get('answer', '').strip()

    if not question or not answer:
        return jsonify({'status': 'error', 'message': 'Question and Answer are required.'}), 400

    faq = ChatbotFAQ(
        question=question,
        answer=answer,
        category=data.get('category', 'general').lower()
    )

    db.session.add(faq)
    db.session.commit()

    return jsonify({'status': 'success', 'faq': faq.to_dict()}), 201
