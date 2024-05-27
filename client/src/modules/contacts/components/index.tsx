import React, { useState, useEffect } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Modal,
  Typography,
  Box,
  CircularProgress,
  TextField,
  Paper,
} from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { Contact } from "../../form/types";
import { Repository } from "../../../infrastructure/contact";
import { useFavoriteStore } from "../../../store";

const repository = new Repository();

export const Contacts: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const { favorites, addFavorite, removeFavorite, isFavorite } =
    useFavoriteStore();

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const allContacts = await repository.getAllContacts();
      setContacts(allContacts);
      setIsEmpty(allContacts.length === 0);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditContact = (contact: Contact) => {
    setSelectedContact(contact);
    setOpenModal(true);
  };

  const handleSaveEditContact = async (event: React.FormEvent) => {
    event.preventDefault();
    if (selectedContact) {
      try {
        await repository.editContact(selectedContact);
        fetchContacts();
        setOpenModal(false);
      } catch (error) {
        console.error("Error editing contact:", error);
      }
    }
  };

  const handleDeleteContact = async (contactId: string) => {
    try {
      await repository.deleteContact(contactId);
      fetchContacts();
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  const handleToggleFavorite = (contact: Contact) => {
    if (isFavorite(contact.id as string)) {
      removeFavorite(contact.id as string);
    } else {
      addFavorite(contact);
    }
  };

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (contact.phone &&
        contact.phone.toLowerCase().includes(searchQuery.toLowerCase())),
  );

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div>
      <Box mb={2}>
        <TextField
          label="Search by Name or Phone"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Box>
      {isEmpty ? (
        <Typography>No contacts available</Typography>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredContacts.map((contact) => (
              <TableRow key={contact.id}>
                <TableCell>{contact.first_name}</TableCell>
                <TableCell>{contact.last_name}</TableCell>
                <TableCell>{contact.email}</TableCell>
                <TableCell>{contact.phone}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEditContact(contact)}>
                    Edit
                  </Button>
                  <Button onClick={() => handleDeleteContact(contact.id!)}>
                    Delete
                  </Button>
                  <Button component={Link} to={`/contact/${contact.id}`}>
                    View
                  </Button>
                  <Button onClick={() => handleToggleFavorite(contact)}>
                    {isFavorite(contact.id) ? <Favorite /> : <FavoriteBorder />}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <Paper
            elevation={3}
            sx={{ p: 4, width: "400px", textAlign: "center" }}
          >
            {selectedContact && (
              <div>
                <Typography variant="h6" gutterBottom>
                  Edit Contact
                </Typography>
                <form onSubmit={handleSaveEditContact}>
                  <TextField
                    fullWidth
                    margin="normal"
                    label="First Name"
                    value={selectedContact.first_name}
                    onChange={(e) =>
                      setSelectedContact({
                        ...selectedContact,
                        first_name: e.target.value,
                      })
                    }
                  />
                  <TextField
                    fullWidth
                    margin="normal"
                    label="Last Name"
                    value={selectedContact.last_name}
                    onChange={(e) =>
                      setSelectedContact({
                        ...selectedContact,
                        last_name: e.target.value,
                      })
                    }
                  />
                  <TextField
                    fullWidth
                    margin="normal"
                    label="Email"
                    value={selectedContact.email}
                    onChange={(e) =>
                      setSelectedContact({
                        ...selectedContact,
                        email: e.target.value,
                      })
                    }
                  />
                  <TextField
                    fullWidth
                    margin="normal"
                    label="Phone"
                    value={selectedContact.phone}
                    onChange={(e) =>
                      setSelectedContact({
                        ...selectedContact,
                        phone: e.target.value,
                      })
                    }
                  />
                  <Box mt={2}>
                    <Button variant="contained" color="primary" type="submit">
                      Save
                    </Button>
                  </Box>
                </form>
              </div>
            )}
          </Paper>
        </Box>
      </Modal>
    </div>
  );
};
