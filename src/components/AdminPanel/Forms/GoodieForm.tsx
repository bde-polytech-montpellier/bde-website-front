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
import axios from "axios";
import { getGoodie } from "../../../routes/goodies-api";
import { goodies } from "../../../routes/roots";
import { IGoodieForm } from "../../../models/tiles";

const theme = createTheme();
const defaultSnackbarState = { open: false, severity: "info", message: "" };

export default function GoodieForm(params: IGoodieForm) {
  const [imageUrl, setImageUrl] = React.useState<string | undefined>(undefined);
  const [snackbarState, setSnackbarState] =
    React.useState(defaultSnackbarState);

  const handleCloseForm = () => {
    params.setOpen(false);
  };

  const handleSnackbarClose = () => {
    setSnackbarState(defaultSnackbarState);
  };

  const defaultValues = {
    name: params.goodie.goodie_name ?? "",
    pic: new File([""], ""),
    imgChanged: false,
    description: params.goodie.goodie_description ?? "",
    price: params.goodie.goodie_price ?? "",
  };
  const [formValues, setFormValues] = React.useState(defaultValues);

  const sendFormData = (e: React.FormEvent) => {
    e.preventDefault();
    let formData = new FormData();
    for (const [key, value] of Object.entries(formValues)) {
      formData.set(key, value.toString());
    }
    (params.goodie.goodie_id
      ? axios.put(getGoodie(params.goodie.goodie_id), formData)
      : axios.post(goodies, formData)
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
        <DialogTitle id={"goodieDialogTitle"}>{"Éditer un goodie"}</DialogTitle>
        <Divider flexItem />
        <DialogContent>
          <form onSubmit={sendFormData}>
            <TextField
              id="goodie_name"
              name="name"
              label="Nom du goodie"
              variant="standard"
              value={formValues.name}
              onChange={handleInputChange}
              fullWidth
              required
            />
            <TextField
              id="goodie_price"
              name="price"
              label="Prix"
              variant="standard"
              value={formValues.price}
              onChange={handleInputChange}
              sx={{ mt: 1 }}
            ></TextField>
            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={12} sm={6}>
                <Stack spacing={2}>
                  <TextField
                    id="goodie_description"
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
                      id="select-image"
                      name="pic"
                      style={{ display: "none" }}
                      onChange={handlerImageChange}
                    />
                    {imageUrl && (
                      <Box maxWidth={"100%"}>
                        <img
                          src={imageUrl}
                          alt={"Goodie content"}
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
            </Grid>
          </form>
        </DialogContent>
        <Divider flexItem />
        <DialogActions>
          <Button onClick={handleCloseForm}>Annuler</Button>
          <Button onClick={sendFormData}>Valider</Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}
