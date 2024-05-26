import React, { useState, useEffect } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Modal,
} from "@mui/material";
import { Contact } from "../../form/types";
import { Repository } from "../../../infrastructure/contact";

const repository = new Repository();

export const Contacts: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const allContacts = await repository.getAllContacts();
      setContacts(allContacts);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  const handleEditContact = (contact: Contact) => {
    setSelectedContact(contact);
    setOpenModal(true);
  };

  const handleDeleteContact = async (contactId: string) => {
    try {
      await repository.deleteContact(contactId);
      fetchContacts(); // Refresh contacts after deletion
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  return (
    <div>
      {contacts.length === 0 ? (
        <p>No contacts available</p>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contacts.map((contact) => (
              <TableRow key={contact.id}>
                <TableCell>{contact.first_name}</TableCell>
                <TableCell>{contact.last_name}</TableCell>
                <TableCell>{contact.email}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEditContact(contact)}>
                    Edit
                  </Button>
                  <Button onClick={() => handleDeleteContact(contact.id!)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};
