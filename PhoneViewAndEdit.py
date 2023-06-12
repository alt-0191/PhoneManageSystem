from app import db


class Phone(db.Model):
    id = db.Column('phone', db.Integer, primary_key=True)
    username = db.Column(db.String(10), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    gender = db.Column(db.String(20), nullable=False)


def __init__(self, username, email, gender):
    self.username = username
    self.email = email
    self.gender = gender


db.create_all()
