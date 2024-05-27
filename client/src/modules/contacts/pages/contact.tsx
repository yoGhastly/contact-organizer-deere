import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Breadcrumbs,
  Link,
  Button,
} from "@mui/material";
import { Repository } from "../../../infrastructure/contact";
import { Contact } from "../../form/types";

const repository = new Repository();

export const ContactPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [contact, setContact] = useState<Contact | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (id) {
      fetchContact(id);
    }
  }, [id]);

  const fetchContact = async (contactId: string) => {
    try {
      const fetchedContact = await repository.getContact({ id: contactId });
      if (Array.isArray(fetchedContact)) {
        setContact(fetchedContact[0]); // assuming the API returns an array even for single results
      } else {
        setContact(fetchedContact);
      }
    } catch (error) {
      console.error("Error fetching contact:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (!contact) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        gap={10}
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Typography variant="h4">Contact not found</Typography>
        <Link href="/" underline="none">
          <Button variant="contained">Create a new contact</Button>
        </Link>
      </Box>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          Home
        </Link>
        <Link underline="none" color="inherit">
          Contact
        </Link>
        <Typography color="text.primary">{contact.first_name}</Typography>
      </Breadcrumbs>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Paper elevation={3} sx={{ p: 4, width: "400px", textAlign: "center" }}>
          <Typography variant="h5" gutterBottom>
            Contact Details
          </Typography>
          <Typography>First Name: {contact.first_name}</Typography>
          <Typography>Last Name: {contact.last_name}</Typography>
          <Typography>Email: {contact.email}</Typography>
          <Typography>Phone: {contact.phone}</Typography>
          <Typography>Street: {contact.street}</Typography>
          <Typography>City: {contact.city}</Typography>
          <Typography>State: {contact.state}</Typography>
          <Typography>Company: {contact.company}</Typography>
          <Typography>Position: {contact.position}</Typography>
          <Typography>Notes: {contact.notes}</Typography>
          <Typography>Birthday: {contact.birthday}</Typography>
        </Paper>
      </Box>
    </div>
  );
};
