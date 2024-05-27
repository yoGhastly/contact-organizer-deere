import { Contact } from "./Contact";
import { ContactCriteria } from "./Criteria";

export interface ContactRepository {
  getAllContacts(): Promise<Contact[]>;
  getContact(criteria: ContactCriteria): Promise<Contact | Contact[]>;
  createContact(contact: Contact): Promise<Contact>;
  deleteContact(contactId: string): Promise<void>;
  editContact(contact: Contact): Promise<Contact>;
}
