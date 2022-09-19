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
import { IGoodieFormData } from "../../../models/forms";

const theme = createTheme();
const defaultSnackbarState = { open: false, severity: "info", message: "" };
const defaultState: IGoodieFormData = {
  name: "",
  pic: undefined,
  imgChanged: false,
  description: "",
  price: undefined,
};

export default function GoodieForm(params: IGoodieForm) {
  const [imageUrl, setImageUrl] = React.useState<string | undefined>(
    params.goodie.goodie_pic,
  );
  const [snackbarState, setSnackbarState] =
    React.useState(defaultSnackbarState);
  const [formValues, setFormValues] =
    React.useState<IGoodieFormData>(defaultState);

  const handleCloseForm = () => {
    params.setInfo!({
      goodie_id: undefined,
      goodie_name: undefined,
      goodie_pic: undefined,
      goodie_description: undefined,
      goodie_price: undefined,
    });
    setFormValues(defaultState);
    params.setOpenForm(false);
  };

  const handleSnackbarClose = () => {
    setSnackbarState(defaultSnackbarState);
  };

  const sendFormData = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formValues.name) {
      setSnackbarState({
        open: true,
        severity: "info",
        message: "Name is required",
      });
      return;
    }
    let formData = new FormData();
    for (const [key, value] of Object.entries(formValues)) {
      if (typeof value === "boolean" || typeof value === "number")
        formData.set(key, value.toString());
      else formData.set(key, value);
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

  React.useEffect(() => {
    if (params.goodie.goodie_id) {
      setFormValues({
        ...formValues,
        name: params.goodie.goodie_name ?? "",
        pic: undefined,
        imgChanged: false,
        description: params.goodie.goodie_description ?? "",
        price: params.goodie.goodie_price,
      });
      setImageUrl(params.goodie.goodie_pic);
    }
  }, [params.goodie]);

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
        <form onSubmit={sendFormData}>
          <DialogContent>
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
              value={formValues.price ?? ""}
              onChange={handleInputChange}
              sx={{ mt: 1 }}
            />
            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="goodie_description"
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
