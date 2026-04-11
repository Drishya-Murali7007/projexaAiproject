from flask import Blueprint, request, jsonify
from models import Announcement
from app import db

announcements_bp = Blueprint('announcements', __name__)

@announcements_bp.route('/', methods=['GET'], strict_slashes=False)
def get_announcements():
    anns = Announcement.query.order_by(Announcement.created_at.desc()).all()

    return jsonify([{
        'id': a.id,
        'title': a.title,
        'content': a.content,
        'created_at': a.created_at.isoformat()
    } for a in anns])


@announcements_bp.route('/', methods=['POST'])
def post_announcement():
    data = request.get_json()

    title = data.get('title')
    content = data.get('content')

    if not title or not content:
        return jsonify({'error': 'Title and content are required'}), 400

    ann = Announcement(
        title=title,
        content=content,
        user_id=1
    )

    db.session.add(ann)
    db.session.commit()

    return jsonify({
        'message': 'Announcement posted successfully',
        'id': ann.id
    }), 201