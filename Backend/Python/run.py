from app import app

#Contains the actual python code that will import the app (variable from __init__.py) and start the development server.
#To start the app from terminal cd into root folder (Python) and execute this in the terminal - $ flask\Scripts\python run.p
app.run(debug=True)