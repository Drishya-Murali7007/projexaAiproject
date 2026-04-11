import os
import uuid
from flask import Blueprint, request, jsonify, send_from_directory, current_app
from werkzeug.utils import secure_filename
from models import Resource
from app import db
from utils.helpers import allowed_file

resources_bp = Blueprint('resources', __name__)

# ------------------------
# UPLOAD
# ------------------------
@resources_bp.route('/upload', methods=['POST'])
def upload_resource():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']
    if file.filename == '' or not allowed_file(file.filename):
        return jsonify({'error': 'Invalid file type or no file selected'}), 400

    upload_folder = current_app.config['UPLOAD_FOLDER']

    filename = f"{uuid.uuid4().hex}_{secure_filename(file.filename)}"
    file.save(os.path.join(upload_folder, filename))

    resource = Resource(
        original_filename=file.filename,
        filename=filename,
        user_id=1
    )
    db.session.add(resource)
    db.session.commit()

    return jsonify({'message': 'Resource uploaded successfully', 'id': resource.id}), 201


# ------------------------
# GET RESOURCES
# ------------------------
@resources_bp.route('/', methods=['GET'], strict_slashes=False)
def get_resources():
    resources = Resource.query.all()

    return jsonify([{
        'id': r.id,
        'title': r.original_filename,
        'downloadUrl': f"/resources/download/{r.id}"
    } for r in resources])


# ------------------------
# DOWNLOAD
# ------------------------
@resources_bp.route('/download/<int:resource_id>', methods=['GET'])
def download_resource(resource_id):
    resource = Resource.query.get_or_404(resource_id)

    return send_from_directory(
        current_app.config['UPLOAD_FOLDER'],
        resource.filename,
        as_attachment=True,
        download_name=resource.original_filename
    )