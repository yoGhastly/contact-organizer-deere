import { api } from "../api/createContact";
import { Contact } from "../domain/contact/Contact";
import { ContactRepository } from "../domain/contact/ContactRepository";
import { ContactCriteria } from "../domain/contact/Criteria";

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
  /*
   * I used the criteria pattern to be able to search for contacts by different
   * fields. This way, I can search for contacts by id, first name, last name, etc.
   *
   * NOTE: The call to the API is just for /contacts/:id, but you can add more fields and
   * update the /contacts endpoint to accept query params
   */
  async getContact(criteria: ContactCriteria): Promise<Contact | Contact[]> {
    try {
      const params = new URLSearchParams();
      if (criteria.id) params.append("id", criteria.id);
      if (criteria.first_name) params.append("first_name", criteria.first_name);
      if (criteria.last_name) params.append("last_name", criteria.last_name);

      const response = await api.get(`/contacts/${criteria.id}`);
      if (response.status === 200) {
        console.log("Contacts retrieved successfully:", response.data);
        return response.data;
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
      if (response.status === 200) {
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

  async editContact(contact: Contact): Promise<Contact> {
    try {
      const response = await api.put(`/contacts/${contact.id}`, contact);
      if (response.status === 200) {
        console.log("Contact edited successfully:", response.data.contact);
        return response.data.contact;
      } else {
        console.error("Failed to edit contact:", response.data.error);
        throw new Error(response.data.error);
      }
    } catch (error) {
      console.error("Error editing contact:", error);
      throw error;
    }
  }
}
