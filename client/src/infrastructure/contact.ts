import { api } from "../api/createContact";
import { Contact } from "../domain/contact/Contact";
import { ContactRepository } from "../domain/contact/ContactRepository";

export class Repository implements ContactRepository {
  async getAllContacts(): Promise<Contact[]> {
    try {
      const response = await api.get("/contacts");
      if (response.status === 200) {
        console.log("Contacts retrieved successfully:", response.data.contacts);
        return response.data.contacts;
      } else {
        console.error("Failed to retrieve contacts:", response.data.error);
        throw new Error(response.data.error);
      }
    } catch (error) {
      console.error("Error retrieving contacts:", error);
      throw error;
    }
  }

  async createContact(contact: Contact): Promise<Contact> {
    try {
      const response = await api.post("/contacts", contact);
      if (response.status === 201) {
        console.log("Contact created successfully:", response.data.contact);
        return response.data.contact;
      } else {
        console.error("Failed to create contact:", response.data.error);
        throw new Error(response.data.error);
      }
    } catch (error) {
      console.error("Error creating contact:", error);
      throw error;
    }
  }

  async deleteContact(contactId: string): Promise<void> {
    try {
      const response = await api.delete(`/contacts/${contactId}`);
      if (response.status === 204) {
        console.log("Contact deleted successfully");
      } else {
        console.error("Failed to delete contact:", response.data.error);
        throw new Error(response.data.error);
      }
    } catch (error) {
      console.error("Error deleting contact:", error);
      throw error;
    }
  }
}
