from database.db_config import db

events = db["events"]

def add_event(title, date):
    return events.insert_one({
        "title": title,
        "date": date
    })

def get_events():
    return list(events.find())