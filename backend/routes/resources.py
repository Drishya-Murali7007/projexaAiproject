import os
import uuid
from flask import Blueprint, request, jsonify, send_from_directory, current_app
from flask_jwt_extended import jwt_required, get_jwt_identity
from werkzeug.utils import secure_filename
from models import Resource
from app import db
from utils.helpers import allowed_file

resources_bp = Blueprint('resources', __name__)

@resources_bp.route('/upload', methods=['POST'])
@jwt_required()
def upload_resource():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']
    if file.filename == '' or not allowed_file(file.filename):
        return jsonify({'error': 'Invalid file type or no file selected'}), 400

    user_id = get_jwt_identity()
    upload_folder = current_app.config['UPLOAD_FOLDER']

    filename = f"{uuid.uuid4().hex}_{secure_filename(file.filename)}"
    file.save(os.path.join(upload_folder, filename))

    resource = Resource(
        original_filename=file.filename,
        filename=filename,
        user_id=user_id
    )
    db.session.add(resource)
    db.session.commit()

    return jsonify({'message': 'Resource uploaded successfully', 'id': resource.id}), 201


@resources_bp.route('/', methods=['GET'])
@jwt_required()
def get_resources():
    resources = Resource.query.all()
    return jsonify([{
        'id': r.id,
        'original_filename': r.original_filename,
        'upload_date': r.upload_date.isoformat()
    } for r in resources]), 200


@resources_bp.route('/download/<int:resource_id>', methods=['GET'])
@jwt_required()
def download_resource(resource_id):
    resource = Resource.query.get_or_404(resource_id)
    return send_from_directory(
        current_app.config['UPLOAD_FOLDER'],
        resource.filename,
        as_attachment=True,
        download_name=resource.original_filename
    )