def validate_contact_data(data):
    required_fields = [
        'first_name', 'last_name', 'phone', 'email',
        'street', 'city', 'state', 'company', 'position',
        'notes', 'birthday'
    ]
    missing_fields = [field for field in required_fields if field not in data]
    if missing_fields:
        return False, f'Missing fields: {", ".join(missing_fields)}'
    return True, ''
