"use client";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../../form/schema";
import { Contact } from "../../form/types";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Snackbar,
  TextField,
} from "@mui/material";
import { onSubmit } from "../../form/actions";

export const CreateContactForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Contact>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: yupResolver(schema) as any,
  });

  const handleFormSubmit: SubmitHandler<Contact> = async (data) => {
    setLoading(true);
    try {
      await onSubmit(data);
      setSnackbarOpen(true);
      reset();
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container>
      <Box mt={5}>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name"
                {...register("first_name")}
                error={!!errors.first_name}
                helperText={errors.first_name?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                {...register("last_name")}
                error={!!errors.last_name}
                helperText={errors.last_name?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone"
                {...register("phone")}
                error={!!errors.phone}
                helperText={errors.phone?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Street"
                {...register("street")}
                error={!!errors.street}
                helperText={errors.street?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="City"
                {...register("city")}
                error={!!errors.city}
                helperText={errors.city?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="State"
                {...register("state")}
                error={!!errors.state}
                helperText={errors.state?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Company"
                {...register("company")}
                error={!!errors.company}
                helperText={errors.company?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Position"
                {...register("position")}
                error={!!errors.position}
                helperText={errors.position?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Notes"
                multiline
                rows={4}
                {...register("notes")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Birthday"
                type="date"
                InputLabelProps={{ shrink: true }}
                {...register("birthday")}
                error={!!errors.birthday}
                helperText={errors.birthday?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" alignItems="center" justifyItems="center">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={loading}
                >
                  Submit
                </Button>
                {loading && <CircularProgress size={24} sx={{ ml: 2 }} />}
              </Box>
            </Grid>
          </Grid>
        </form>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          message="Contact saved"
          action={
            <Button color="inherit" size="small" onClick={handleCloseSnackbar}>
              Close
            </Button>
          }
        />
      </Box>
    </Container>
  );
};
