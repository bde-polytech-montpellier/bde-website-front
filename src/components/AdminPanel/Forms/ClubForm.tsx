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
import { Instagram, Facebook } from "@mui/icons-material";
import axios from "axios";
import { getClub } from "../../../routes/clubs-api";
import { clubs } from "../../../routes/roots";
import { ClubTileActions } from "../../../models/club";

interface ClubFormActions extends ClubTileActions {
  open: boolean;
  setOpenForm: React.Dispatch<React.SetStateAction<boolean>>;
}

interface CreateUpdateClubRequest {
  name: string;
  pic: File | undefined;
  imgChanged: boolean;
  short_description: string;
  description: string;
  fb: string;
  ig: string;
}

const theme = createTheme();
const defaultSnackbarState = { open: false, severity: "info", message: "" };
const defaultState: CreateUpdateClubRequest = {
  name: "",
  pic: new File([""], ""),
  imgChanged: false,
  short_description: "",
  description: "",
  fb: "",
  ig: "",
};

export default function ClubForm(params: ClubFormActions) {
  const [imageUrl, setImageUrl] = React.useState<string | undefined>(
    params.club.club_pic,
  );
  const [snackbarState, setSnackbarState] =
    React.useState(defaultSnackbarState);

  const handleCloseForm = () => {
    params.setInfo!({
      club_id: undefined,
      club_name: undefined,
      club_short_description: undefined,
      club_pic: undefined,
      club_description: undefined,
      club_fb: undefined,
      club_ig: undefined,
    });
    setFormValues(defaultState);
    setImageUrl(undefined);
    params.setOpenForm(false);
  };

  const handleSnackbarClose = () => {
    setSnackbarState(defaultSnackbarState);
  };

  const [formValues, setFormValues] =
    React.useState<CreateUpdateClubRequest>(defaultState);

  const sendFormData = (e: React.FormEvent) => {
    e.preventDefault();
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
      if (typeof value === "boolean") formData.set(key, value.toString());
      else formData.set(key, value);
    }

    (params.club.club_id
      ? axios.put(getClub(params.club.club_id), formData)
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
    if (params.club.club_id) {
      setFormValues((formValues) => ({
        ...formValues,
        name: params.club.club_name ?? "",
        short_description: params.club.club_short_description ?? "",
        pic: undefined,
        description: params.club.club_description ?? "",
        fb: params.club.club_fb ?? "",
        ig: params.club.club_ig ?? "",
      }));
      setImageUrl(params.club.club_pic);
    }
  }, [params.club]);

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
        <DialogTitle id={"clubDialogTitle"}>{"Éditer un club"}</DialogTitle>
        <Divider flexItem />
        <form onSubmit={sendFormData}>
          <DialogContent>
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
            />
            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="club_description"
                  name="description"
                  label="Description"
                  value={formValues.description}
                  onChange={handleInputChange}
                  style={{ width: "100%" }}
                  multiline
                  rows={6}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Stack spacing={1} alignItems="center">
                  <Box textAlign={"center"}>
                    <Input
                      type="file"
                      id="select-image"
                      name="pic"
                      style={{ display: "none" }}
                      onChange={handlerImageChange}
                    />
                    {imageUrl && (
                      <Box maxWidth={"100%"}>
                        <img
                          src={imageUrl}
                          alt={"Club content"}
                          height="100px"
                        />
                      </Box>
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
