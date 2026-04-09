from database.db_config import db

announcements = db["announcements"]

def add_announcement(title, content):
    return announcements.insert_one({
        "title": title,
        "content": content
    })

def get_announcements():
    return list(announcements.find())