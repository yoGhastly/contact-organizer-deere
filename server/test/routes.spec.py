import unittest
from app import create_app

class ContactTestCase(unittest.TestCase):
    def setUp(self):
        self.app = create_app()
        self.client = self.app.test_client()
        self.app.config['TESTING'] = True

    def test_add_contact(self):
        response = self.client.post('/contacts/', json={
            'first_name': 'John',
            'last_name': 'Doe',
            'phone': '123456789',
            'email': 'john.doe@example.com',
            'street': '123 Fake Street',
            'city': 'City',
            'state': 'State',
            'company': 'Company',
            'position': 'Position',
            'notes': 'Additional notes',
            'birthday': '1990-01-01'
        })
        self.assertEqual(response.status_code, 201)

    def test_get_contacts(self):
        response = self.client.get('/contacts/')
        self.assertEqual(response.status_code, 200)

if __name__ == '__main__':
    unittest.main()
