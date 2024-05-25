from flask import Flask
from .routes import contacts_bp

def create_app():
    app = Flask(__name__)
    app.register_blueprint(contacts_bp, url_prefix='/contacts')
    return app
