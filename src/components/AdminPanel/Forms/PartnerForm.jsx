import * as React from "react";
import {
  Alert,
  Button,
  createTheme,
  CssBaseline,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Input,
  Snackbar,
  Stack,
  TextField,
  ThemeProvider,
} from "@mui/material";
import { Box } from "@mui/system";
import { AlternateEmail, Web } from "@mui/icons-material";
import axios from "axios";
import { getPartner } from "../../../routes/partners-api";
import { partners } from "../../../routes/roots";

const theme = createTheme();
const defaultSnackbarState = { open: false, severity: "info", message: "" };

export default function PartnerForm({ action, open, setOpen, partnerObject }) {
  const [imageUrl, setImageUrl] = React.useState(null);
  const [snackbarState, setSnackbarState] =
    React.useState(defaultSnackbarState);

  const handleCloseForm = () => {
    setOpen(false);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") return;
    else setSnackbarState(defaultSnackbarState);
  };

  const defaultValues = {
    name: partnerObject.name ?? "",
    pic: partnerObject.img ?? "",
    short_description: partnerObject.short_desc ?? "",
    description: partnerObject.description ?? "",
    mail: partnerObject.mail ?? "",
    website: partnerObject.website ?? "",
  };
  const [formValues, setFormValues] = React.useState(defaultValues);

  const sendFormData = (event) => {
    event.preventDefault();
    let formData = new FormData();
    for (const [key, value] of Object.entries(formValues)) {
      formData.set(key, value);
    }

    (partnerObject.id
      ? axios.put(getPartner(partnerObject.id), formData)
      : axios.post(partners, formData)
    )
      .then((response) => {
        setSnackbarState({
          open: true,
          severity: "success",
          message: response.data.message,
        });
        handleCloseForm();
      })
      .catch((error) => {
        console.log(error);
        setSnackbarState({
          open: true,
          severity: "error",
          message: error.response.data.message,
        });
      });
  };

  const handlerImageChange = (e) => {
    setImageUrl(URL.createObjectURL(e.target.files[0]));

    setFormValues({
      ...formValues,
      pic: e.target.files[0],
      imgChanged: true,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Snackbar
        open={snackbarState.open}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarState.severity}>
          {snackbarState.message}
        </Alert>
      </Snackbar>
      <Dialog open={open} onClose={handleCloseForm}>
        <DialogTitle id={"partnerDialogTitle"}>
          {action + " un partenaire"}
        </DialogTitle>
        <Divider flexItem />
        <form onSubmit={sendFormData}>
          <DialogContent>
            <TextField
              id="partner_name"
              name="name"
              label="Nom du partenaire"
              variant="standard"
              value={formValues.name}
              onChange={handleInputChange}
              fullWidth
              required
            />
            <TextField
              id="partner_short_description"
              name="short_description"
              label="Description rapide"
              variant="standard"
              sx={{ mt: 1 }}
              value={formValues.short_description}
              onChange={handleInputChange}
              fullWidth
              required
            ></TextField>
            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={6}>
                <Stack spacing={2}>
                  <TextField
                    id="partner_description"
                    name="description"
                    label="Description"
                    value={formValues.description}
                    onChange={handleInputChange}
                    style={{ width: "100%" }}
                    multiline
                  />
                </Stack>
              </Grid>
              <Grid item xs={6}>
                <Stack spacing={1} alignItems="center">
                  <Box textAlign={"center"}>
                    <Input
                      type="file"
                      accept="image/*"
                      id="partner_image"
                      name="pic"
                      onChange={handlerImageChange}
                      style={{ display: "none" }}
                    />
                    {imageUrl && (
                      <img
                        src={imageUrl}
                        alt={"Partner"}
                        height="100px"
                        sx={{ maxWidth: "100%" }}
                      />
                    )}
                  </Box>
                  <label htmlFor="partner_image">
                    <Button
                      variant="contained"
                      color="primary"
                      component="span"
                    >
                      Upload Image
                    </Button>
                  </label>
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                    <Web color="primary" sx={{ mr: 1, my: 0.5 }} />
                    <TextField
                      id="partner_website"
                      name="website"
                      label="Site web"
                      variant="standard"
                      value={formValues.website}
                      onChange={handleInputChange}
                      fullWidth
                    />
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                    <AlternateEmail color="primary" sx={{ mr: 1, my: 0.5 }} />
                    <TextField
                      id="partner_email"
                      name="mail"
                      label="Email"
                      variant="standard"
                      value={formValues.mail}
                      onChange={handleInputChange}
                      fullWidth
                    />
                  </Box>
                </Stack>
              </Grid>
            </Grid>
          </DialogContent>
          <Divider flexItem />
          <DialogActions>
            <Button onClick={handleCloseForm}>Annuler</Button>
            <Button type="submit">Valider</Button>
          </DialogActions>
        </form>
      </Dialog>
    </ThemeProvider>
  );
}
