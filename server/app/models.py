import uuid

class Contact:
    def __init__(self, first_name, last_name, phone, email, street, city, state, company, position, notes, birthday):
        self.id = str(uuid.uuid4())
        self.first_name = first_name
        self.last_name = last_name
        self.phone = phone
        self.email = email
        self.street = street
        self.city = city
        self.state = state
        self.company = company
        self.position = position
        self.notes = notes
        self.birthday = birthday

    def update(self, data):
        for key, value in data.items():
            if hasattr(self, key):
                setattr(self, key, value)
