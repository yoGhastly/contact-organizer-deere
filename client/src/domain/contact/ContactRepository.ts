import { Contact } from "./Contact";

export interface ContactRepository {
  getAllContacts(): Promise<Contact[]>;
  createContact(contact: Contact): Promise<Contact>;
  deleteContact(contactId: string): Promise<void>;
}
