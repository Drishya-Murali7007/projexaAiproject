import os
from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager

db = SQLAlchemy()
jwt = JWTManager()

def create_app():
    app = Flask(__name__)

    app.config['SECRET_KEY'] = 'zenspace-secret-key-2026'
    app.config['JWT_SECRET_KEY'] = 'zenspace-jwt-secret-2026'
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///zenspace.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['UPLOAD_FOLDER'] = os.path.join(os.path.dirname(__file__), 'uploads')

    db.init_app(app)
    jwt.init_app(app)

    # Register Blueprints
    from routes.auth import auth_bp
    from routes.resources import resources_bp
    from routes.announcements import announcements_bp

    app.register_blueprint(auth_bp, url_prefix='/auth')
    app.register_blueprint(resources_bp, url_prefix='/resources')
    app.register_blueprint(announcements_bp, url_prefix='/announcements')

    # Create tables and upload folder
    with app.app_context():
        db.create_all()
        os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

    @app.route('/')
    def home():
        return jsonify({"message": "🌿 ZENSPACE API is running - Calm. Connect. Create."})

    return app


if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, port=5000)