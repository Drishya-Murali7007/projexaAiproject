from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import Announcement
from app import db

announcements_bp = Blueprint('announcements', __name__)

@announcements_bp.route('/', methods=['GET'])
@jwt_required()
def get_announcements():
    anns = Announcement.query.order_by(Announcement.created_at.desc()).all()
    return jsonify([{
        'id': a.id,
        'title': a.title,
        'content': a.content,
        'created_at': a.created_at.isoformat()
    } for a in anns]), 200


@announcements_bp.route('/', methods=['POST'])
@jwt_required()
def post_announcement():
    data = request.get_json()
    title = data.get('title')
    content = data.get('content')

    if not title or not content:
        return jsonify({'error': 'Title and content are required'}), 400

    user_id = get_jwt_identity()
    ann = Announcement(title=title, content=content, user_id=user_id)
    db.session.add(ann)
    db.session.commit()

    return jsonify({'message': 'Announcement posted successfully', 'id': ann.id}), 201