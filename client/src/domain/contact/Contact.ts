export interface Contact {
  id?: string; // Optional if the ID is generated on the server-side
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  street: string;
  city: string;
  state: string;
  company: string;
  position: string;
  notes?: string;
  birthday: string; // Date format: YYYY-MM-DD
}
