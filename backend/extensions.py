# from flask_sqlalchemy import SQLAlchemy
# from flask_jwt_extended import JWTManager

# from extensions import db, jwt
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager

db = SQLAlchemy()
jwt = JWTManager()