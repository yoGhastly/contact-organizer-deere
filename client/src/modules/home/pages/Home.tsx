import React, { useState } from "react";
import { Container, Box, Tabs, Tab, Typography } from "@mui/material";
import { CreateContactForm } from "../components/create-contact-form";
import { Contacts } from "../../contacts/components";
import { Favorites } from "../../contacts/components/favorites";

export const Home: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Container>
      <Box sx={{ width: "100%", mt: 5 }}>
        <Tabs value={tabValue} onChange={handleChange} centered>
          <Tab label="Create Contact" />
          <Tab label="Favorites" />
          <Tab label="Contacts" />
        </Tabs>
        <Box sx={{ mt: 3 }}>
          {tabValue === 0 && (
            <Box>
              <CreateContactForm />
            </Box>
          )}
          {tabValue === 1 && (
            <Box>
              <Typography variant="h5" gutterBottom>
                Favorites
              </Typography>
              <Favorites />
            </Box>
          )}
          {tabValue === 2 && (
            <Box>
              <Typography variant="h5" gutterBottom>
                Contacts
              </Typography>
              <Contacts />
            </Box>
          )}
        </Box>
      </Box>
    </Container>
  );
};
