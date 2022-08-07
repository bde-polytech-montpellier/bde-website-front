import * as React from "react";
import {
  Alert,
  Autocomplete,
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
  InputAdornment,
  Snackbar,
  Stack,
  TextField,
  ThemeProvider,
} from "@mui/material";
import { Box } from "@mui/system";
import { CalendarMonth, AccessTime, Place } from "@mui/icons-material";
import axios from "axios";
import { getEvent } from "../../../routes/events-api";
import { events, clubs } from "../../../routes/roots";
import { dateParserForInputs } from "../../../utils/dateParser";
import FormData from "form-data";

const theme = createTheme();
const defaultSnackbarState = { open: false, severity: "info", message: "" };

export default function EventForm({ action, open, setOpen, eventObject }) {
  const [imageUrl, setImageUrl] = React.useState(null);
  const [clubsList, setClubs] = React.useState(new Map());
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
    name: eventObject.name ?? "",
    pic: eventObject.pic ?? "",
    short_description: eventObject.short_desc ?? "",
    description: eventObject.description ?? "",
    date: dateParserForInputs(eventObject.date) ?? "",
    time: eventObject.time ?? "",
    place: eventObject.place ?? "",
    datetime: eventObject.datetime ?? "",
    price: eventObject.price ?? "",
    club_id: eventObject.club_id ?? "",
    club_name: eventObject.club_name ?? "",
  };
  const [formValues, setFormValues] = React.useState(defaultValues);

  const sendFormData = (event) => {
    event.preventDefault();
    let formData = new FormData();
    for (const [key, value] of Object.entries(formValues)) {
      formData.set(key, value);
    }

    (eventObject.id
      ? axios.put(getEvent(eventObject.id), formData)
      : axios.post(events, formData)
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

  const handleImageChange = (e) => {
    setImageUrl(URL.createObjectURL(e.target.files[0]));
    setFormValues({
      ...formValues,
      pic: e.target.files[0],
      imgChanged: true,
    });
  };

  const handleClubNameChange = (e, value) => {
    setFormValues({
      ...formValues,
      club_id: clubsList.get(value),
      club_name: value,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  React.useEffect(() => {
    axios.get(clubs).then((response) => {
      const list = new Map(
        response.data.map((club) => {
          return [club.club_name, club.club_id];
        })
      );
      setClubs(list);
    });
  }, []);

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
        <form id="event-form" onSubmit={sendFormData}>
          <DialogTitle id={"EventDialogTitle"}>
            {action + " un event"}
          </DialogTitle>
          <Divider flexItem />
          <DialogContent>
            <Stack direction={{ xs: "column-reverse", md: "row" }}>
              <TextField
                id="Event_name"
                name="name"
                label="Nom de l'event"
                variant="standard"
                value={formValues.name}
                onChange={handleInputChange}
                fullWidth
                required
              />
              <Autocomplete
                disablePortal
                id="club_id"
                name="club_id"
                options={Array.from(clubsList.keys())}
                sx={{ width: "auto", minWidth: "200px", ml: 2 }}
                renderInput={(params) => (
                  <TextField {...params} label="Club organisateur" />
                )}
                value={formValues.club_name}
                onChange={handleClubNameChange}
              />
            </Stack>
            <Stack direction={{ xs: "column-reverse", md: "row" }}>
              <TextField
                name="short_description"
                label="Description rapide"
                variant="standard"
                value={formValues.short_description}
                onChange={handleInputChange}
                sx={{ mt: 1 }}
                fullWidth
                required
              ></TextField>
              <TextField
                name="price"
                label="Prix"
                variant="standard"
                type="number"
                inputProps={{ min: 0 }}
                value={formValues.price}
                onChange={handleInputChange}
                sx={{ mt: 1, ml: 4 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">€</InputAdornment>
                  ),
                }}
              ></TextField>
            </Stack>
            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={12} md={6}>
                <Stack spacing={2}>
                  <TextField
                    id="Event_description"
                    name="description"
                    label="Description"
                    value={formValues.description}
                    onChange={handleInputChange}
                    style={{ width: "100%" }}
                    multiline
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={1} alignItems="center">
                  <Box textAlign={"center"}>
                    <Input
                      type="file"
                      accept="image/*"
                      id="Event_image"
                      name="pic"
                      onChange={handleImageChange}
                      style={{ display: "none" }}
                    />
                    {imageUrl && (
                      <img
                        src={imageUrl}
                        alt={"Event"}
                        height="100px"
                        sx={{ maxWidth: "100%" }}
                      />
                    )}
                  </Box>
                  <label htmlFor="Event_image">
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
              <Grid item xs={12} sx={{ mt: 2 }}>
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  justifyContent="space-evenly"
                >
                  <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                    <CalendarMonth color="primary" sx={{ mr: 1, my: 0.5 }} />
                    <TextField
                      id="event_date"
                      name="date"
                      variant="standard"
                      type="date"
                      value={formValues.date}
                      onChange={handleInputChange}
                      fullWidth
                    />
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                    <AccessTime color="primary" sx={{ mr: 1, my: 0.5 }} />
                    <TextField
                      id="event_time"
                      name="time"
                      type="time"
                      variant="standard"
                      value={formValues.time}
                      onChange={handleInputChange}
                      fullWidth
                    />
                  </Box>
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                  <Place color="primary" sx={{ mr: 1, my: 0.5 }} />
                  <TextField
                    id="event_place"
                    name="place"
                    label="Lieu"
                    variant="standard"
                    value={formValues.place}
                    onChange={handleInputChange}
                    fullWidth
                  />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="event_datetime"
                  name="datetime"
                  label="Localisation temporelle"
                  variant="standard"
                  value={formValues.datetime}
                  onChange={handleInputChange}
                  helperText="Si pas de date prévue"
                  fullWidth
                />
              </Grid>
            </Grid>
          </DialogContent>
          <Divider orientation="horizontal" flexItem />
          <DialogActions>
            <Button onClick={handleCloseForm}>Annuler</Button>
            <Button type="submit">Valider</Button>
          </DialogActions>
        </form>
      </Dialog>
    </ThemeProvider>
  );
}
