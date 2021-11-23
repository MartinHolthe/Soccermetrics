from flask import Flask
from flask_sqlalchemy import SQLAlchemy

#Do not confuse app the variable with app the folder - which gets assigned the FLASK object from views.py
app = Flask(__name__)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:2312Ottestad@localhost/Soccermetrics'
db = SQLAlchemy(app)

class User(db.Model):
    __tablename__ = 'test3'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)

    def __init__(self, username, email):
        self.username = username
        self.email = email

#The views are the handlers that respond to requests from web browsers or other clients. 
#In Flask handlers are written as Python functions. Each view function is mapped to one or more request URLs
@app.route('/')
@app.route('/index')
def index():    
    return "Hello, World!"
