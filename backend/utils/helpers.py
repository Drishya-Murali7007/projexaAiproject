def allowed_file(filename):
    allowed_extensions = {'png', 'jpg', 'jpeg', 'gif', 'pdf', 'mp3', 'wav'}
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in allowed_extensions