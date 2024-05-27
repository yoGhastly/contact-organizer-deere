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
  Paper,
} from "@mui/material";
import { Contact } from "../../form/types";
import { Link } from "react-router-dom";

export const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState<Contact[]>([]);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);

  useEffect(() => {
    const storedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]",
    );
    setFavorites(storedFavorites);
  }, []);

  return (
    <div>
      {favorites.length === 0 ? (
        <Typography>No favorites available</Typography>
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
            {favorites.map((contact) => (
              <TableRow key={contact.id}>
                <TableCell>{contact.first_name}</TableCell>
                <TableCell>{contact.last_name}</TableCell>
                <TableCell>{contact.email}</TableCell>
                <TableCell>
                  <Button component={Link} to={`/contact/${contact.id}`}>
                    View
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
                  Contact Details
                </Typography>
                <Typography>
                  First Name: {selectedContact.first_name}
                </Typography>
                <Typography>Last Name: {selectedContact.last_name}</Typography>
                <Typography>Email: {selectedContact.email}</Typography>
                {/* Add other contact details as needed */}
                <Box mt={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setOpenModal(false)}
                  >
                    Close
                  </Button>
                </Box>
              </div>
            )}
          </Paper>
        </Box>
      </Modal>
    </div>
  );
};
