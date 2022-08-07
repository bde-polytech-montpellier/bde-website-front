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
import { Instagram, Facebook } from "@mui/icons-material";
import axios from "axios";
import { getClub } from "../../../routes/clubs-api";
import { clubs } from "../../../routes/roots";
// import {
//   isInstagramURLInvalid,
//   isFacebookURLInvalid,
// } from "../../../utils/inputValidator";

const theme = createTheme();
const defaultSnackbarState = { open: false, severity: "info", message: "" };

export default function ClubForm({ action, open, setOpen, clubObject }) {
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
    name: clubObject.name ?? "",
    pic: clubObject.pic ?? "",
    short_description: clubObject.short_desc ?? "",
    description: clubObject.description ?? "",
    fb: clubObject.fb ?? "",
    ig: clubObject.ig ?? "",
  };
  const [formValues, setFormValues] = React.useState(defaultValues);

  const sendFormData = (e) => {
    e.preventDefault();
    let formData = new FormData();
    for (const [key, value] of Object.entries(formValues)) {
      formData.set(key, value);
    }
    (clubObject.id
      ? axios.put(getClub(clubObject.id), formData)
      : axios.post(clubs, formData)
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
        <DialogTitle id={"clubDialogTitle"}>{action + " un club"}</DialogTitle>
        <Divider flexItem />
        <DialogContent>
          <form onSubmit={sendFormData}>
            <TextField
              id="club_name"
              name="name"
              label="Nom du club"
              variant="standard"
              value={formValues.name}
              onChange={handleInputChange}
              fullWidth
              required
            />
            <TextField
              id="club_short_description"
              name="short_description"
              label="Description rapide"
              variant="standard"
              value={formValues.short_description}
              onChange={handleInputChange}
              sx={{ mt: 1 }}
              fullWidth
              required
            ></TextField>
            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={12} sm={6}>
                <Stack spacing={2}>
                  <TextField
                    id="club_description"
                    name="description"
                    label="Description"
                    value={formValues.description}
                    onChange={handleInputChange}
                    style={{ width: "100%" }}
                    multiline
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Stack spacing={1} alignItems="center">
                  <Box textAlign={"center"}>
                    <Input
                      type="file"
                      accept="image/*"
                      id="select-image"
                      name="pic"
                      style={{ display: "none" }}
                      onChange={handlerImageChange}
                    />
                    {imageUrl && (
                      <img
                        src={imageUrl}
                        alt={"Club content"}
                        height="100px"
                        sx={{ maxWidth: "100%" }}
                      />
                    )}
                  </Box>
                  <label htmlFor="select-image">
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
                <Box sx={{ display: "flex", alignItems: "flex-end", mb: 1 }}>
                  <Instagram color="error" sx={{ mr: 1, my: 0.5 }} />
                  <TextField
                    id="club_ig"
                    name="ig"
                    label="Instagram"
                    variant="standard"
                    value={formValues.ig}
                    onChange={handleInputChange}
                    fullWidth
                  />
                </Box>
                <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                  <Facebook color="primary" sx={{ mr: 1, my: 0.5 }} />
                  <TextField
                    id="club_fb"
                    name="fb"
                    label="Facebook"
                    variant="standard"
                    value={formValues.fb}
                    onChange={handleInputChange}
                    fullWidth
                  />
                </Box>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <Divider flexItem />
        <DialogActions>
          <Button onClick={handleCloseForm}>Annuler</Button>
          <Button onClick={sendFormData}>Valider</Button>
        </DialogActions>
      </Dialog>
      {/* <Snackbar open={igError} autoHideDuration={4000}>
        <Alert severity="error">L'URL instagram est invalide</Alert>
      </Snackbar>
      <Snackbar open={fbError} autoHideDuration={4000}>
        <Alert severity="error">L'URL facebook est invalide</Alert>
      </Snackbar> */}
    </ThemeProvider>
  );
}
