from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
from .models import Contact
from .utils import validate_contact_data

contacts_bp = Blueprint('contacts', __name__)

contacts = []

@contacts_bp.route('/contacts', methods=['POST'])
@cross_origin()  
def add_contact():
    data = request.json
    if data is None:
        return jsonify({'error': 'Invalid input: No JSON payload found'}), 400

    is_valid, message = validate_contact_data(data)
    if not is_valid:
        return jsonify({'error': message}), 400

    new_contact = Contact(
        first_name=data.get('first_name'),
        last_name=data.get('last_name'),
        phone=data.get('phone'),
        email=data.get('email'),
        street=data.get('street'),
        city=data.get('city'),
        state=data.get('state'),
        company=data.get('company'),
        position=data.get('position'),
        notes=data.get('notes'),
        birthday=data.get('birthday')
    )
    contacts.append(new_contact)
    print(f'New contact added: {new_contact.__dict__}')
    return jsonify({'message': 'Contact added successfully', 'contact': new_contact.__dict__}), 201

@contacts_bp.route('/contacts/<contact_id>', methods=['GET'])
@cross_origin()  
def get_contact(contact_id):
    contact = next((c for c in contacts if c.id == contact_id), None)
    if contact:
        return jsonify(contact.__dict__), 200
    return jsonify({'error': 'Contact not found'}), 404

@contacts_bp.route('/contacts', methods=['GET'])
@cross_origin()  
def get_contacts():
    return jsonify({'contacts': [c.__dict__ for c in contacts]}), 200

@contacts_bp.route('/contacts/<contact_id>', methods=['PUT'])
@cross_origin()  
def update_contact(contact_id):
    data = request.json
    if data is None:
        return jsonify({'error': 'Invalid input: No JSON payload found'}), 400

    contact = next((c for c in contacts if c.id == contact_id), None)
    if contact:
        contact.update(data)
        return jsonify({'message': 'Contact updated successfully', 'contact': contact.__dict__}), 200
    return jsonify({'error': 'Contact not found'}), 404

@contacts_bp.route('/contacts/<contact_id>', methods=['DELETE'])
@cross_origin()  
def delete_contact(contact_id):
    global contacts
    contacts = [c for c in contacts if c.id != contact_id]
    return jsonify({'message': 'Contact deleted successfully'}), 200
