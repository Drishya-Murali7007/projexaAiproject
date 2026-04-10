from database.db_config import db

resources = db["resources"]

def add_resource(title, link):
    return resources.insert_one({
        "title": title,
        "link": link
    })

def get_resources():
    return list(resources.find())