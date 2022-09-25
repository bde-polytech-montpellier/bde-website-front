import * as React from "react";
import {
  Alert,
  AlertColor,
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
import { IPartnerForm, IPartnerFormData } from "../../../models/partner";

const theme = createTheme();
const defaultSnackbarState = { open: false, severity: "info", message: "" };
const defaultState: IPartnerFormData = {
  name: "",
  pic: undefined,
  imgChanged: false,
  short_description: "",
  description: "",
  mail: "",
  website: "",
};

export default function PartnerForm(params: IPartnerForm) {
  const [imageUrl, setImageUrl] = React.useState<string | undefined>(undefined);
  const [snackbarState, setSnackbarState] =
    React.useState(defaultSnackbarState);

  const handleCloseForm = () => {
    params.setInfo!({
      partner_id: undefined,
      partner_name: undefined,
      partner_short_description: undefined,
      partner_pic: undefined,
      partner_description: undefined,
      partner_mail: undefined,
      partner_website: undefined,
    });
    setFormValues(defaultState);
    setImageUrl(undefined);
    params.setOpenForm(false);
  };

  const handleSnackbarClose = () => {
    setSnackbarState(defaultSnackbarState);
  };

  const [formValues, setFormValues] =
    React.useState<IPartnerFormData>(defaultState);

  const sendFormData = (event: React.FormEvent) => {
    event.preventDefault();
    if (!formValues.name || !formValues.short_description) {
      setSnackbarState({
        open: true,
        severity: "info",
        message: "Name and short description are required",
      });
      return;
    }
    let formData = new FormData();
    for (const [key, value] of Object.entries(formValues)) {
      if (typeof value === "boolean" || typeof value === "number")
        formData.set(key, value.toString());
      else formData.set(key, value);
    }

    (params.partner.partner_id
      ? axios.put(getPartner(params.partner.partner_id), formData)
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
        setSnackbarState({
          open: true,
          severity: "error",
          message: error.response.data.message,
        });
      });
  };

  const handlerImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(URL.createObjectURL(e.target.files![0]));

    setFormValues({
      ...formValues,
      pic: e.target.files![0],
      imgChanged: true,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  React.useEffect(() => {
    if (params.partner.partner_id) {
      setFormValues((formValues) => ({
        ...formValues,
        name: params.partner.partner_name ?? "",
        pic: undefined,
        imgChanged: false,
        short_description: params.partner.partner_short_description ?? "",
        description: params.partner.partner_description ?? "",
        mail: params.partner.partner_mail ?? "",
        website: params.partner.partner_website ?? "",
      }));
      setImageUrl(params.partner.partner_pic);
    }
  }, [params.partner]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Snackbar
        open={snackbarState.open}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarState.severity as AlertColor}
        >
          {snackbarState.message}
        </Alert>
      </Snackbar>
      <Dialog open={params.open} onClose={handleCloseForm}>
        <DialogTitle id={"partnerDialogTitle"}>
          {"Éditer un partenaire"}
        </DialogTitle>
        <form onSubmit={sendFormData}>
          <Divider flexItem />
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
            />
            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={6}>
                <TextField
                  id="partner_description"
                  name="description"
                  label="Description"
                  value={formValues.description}
                  onChange={handleInputChange}
                  style={{ width: "100%" }}
                  multiline
                  rows={6}
                />
              </Grid>
              <Grid item xs={6}>
                <Stack spacing={1} alignItems="center">
                  <Box textAlign={"center"}>
                    <Input
                      type="file"
                      id="partner_image"
                      name="pic"
                      onChange={handlerImageChange}
                      style={{ display: "none" }}
                    />
                    {imageUrl && (
                      <Box maxWidth={"100%"}>
                        <img src={imageUrl} alt={"Partner"} height="100px" />
                      </Box>
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
