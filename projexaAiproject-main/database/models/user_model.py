from database.db_config import db

users = db["users"]

def create_user(name, email, password):
    return users.insert_one({
        "name": name,
        "email": email,
        "password": password
    })

def get_user(email):
    return users.find_one({"email": email})