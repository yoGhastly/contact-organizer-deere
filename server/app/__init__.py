from flask import Flask
from flask_cors import CORS
from .routes import contacts_bp

def create_app():
    app = Flask(__name__)
    CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})
    app.config['CORS_HEADERS'] = 'Content-Type'
    app.register_blueprint(contacts_bp, url_prefix='/api')
    return app
