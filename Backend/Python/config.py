"""Flask configuration variables."""
from os import environ, path
from dotenv import load_dotenv

basedir = path.abspath(path.dirname(__file__))
load_dotenv(path.join(basedir, '.env'))


class Config:
    """Set Flask configuration from .env file."""

    # General Config
    WTF_CSRF_ENABLED = True
    SECRET_KEY = environ.get('SECRET_KEY')
    FLASK_APP = environ.get('FLASK_APP')
    FLASK_ENV = environ.get('FLASK_ENV')

    # Database
    SQLALCHEMY_DATABASE_URI = environ.get("SQLALCHEMY_DATABASE_URI") # the connection string we need to connect to our database. This follows the standard convention: [DB_TYPE]+[DB_CONNECTOR]://[USERNAME]:[PASSWORD]@[HOST]:[PORT]/[DB_NAME]
    SQLALCHEMY_ECHO = False                                          # When set to 'True', Flask-SQLAlchemy will log all database activity to Python's stderr for debugging purposes.
    SQLALCHEMY_TRACK_MODIFICATIONS = False                           #  Honestly, I just always set this to 'False,' otherwise an obnoxious warning appears every time you run your app reminding you that this option takes a lot of system resources.