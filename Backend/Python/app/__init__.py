from flask import Flask

#Do not confuse app the variable with app the folder - which gets assigned the FLASK object from views.py
app = Flask(__name__)
app.config.from_object('config')

# Here you can add all your views and modules(?) 
from app import rotelleView #, playerScraperView
