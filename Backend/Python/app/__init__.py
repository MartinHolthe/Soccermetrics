from flask import Flask

#Do not confuse app the variable with app the folder - which gets assigned the FLASK object from views.py
app = Flask(__name__)
app.config.from_object('config')

from app import views