import * as React from "react";
import {
  Alert,
  AlertColor,
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
import { IClub, IEventForm } from "../../../models/tiles";
import { IEventFormData } from "../../../models/forms";

const theme = createTheme();
const defaultSnackbarState = { open: false, severity: "info", message: "" };

const defaultState: IEventFormData = {
  name: "",
  short_description: "",
  imgChanged: false,
  pic: undefined,
  description: "",
  date: "",
  time: "",
  place: "",
  datetime: "",
  price: undefined,
  follower_price: undefined,
  club_id: "",
  club_name: "",
};

export default function EventForm(params: IEventForm) {
  const [imageUrl, setImageUrl] = React.useState<string | undefined>(undefined);
  const [clubsList, setClubs] = React.useState<Map<string, string>>(new Map());
  const [snackbarState, setSnackbarState] =
    React.useState(defaultSnackbarState);

  const handleCloseForm = () => {
    params.setInfo!({
      event_id: undefined,
      event_name: undefined,
      event_short_description: undefined,
      event_pic: undefined,
      event_description: undefined,
      event_date: undefined,
      event_time: undefined,
      event_place: undefined,
      event_datetime: undefined,
      event_price: undefined,
      event_price_follower: undefined,
      event_club_id: undefined,
      club_name: undefined,
    });
    setFormValues(defaultState);
    params.setOpenForm(false);
  };

  const handleSnackbarClose = () => {
    setSnackbarState(defaultSnackbarState);
  };

  const [formValues, setFormValues] =
    React.useState<IEventFormData>(defaultState);

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
      if (typeof value === "boolean" || typeof value === "number")
        formData.set(key, value.toString());
      else formData.set(key, value);
    }

    (params.event.event_id
      ? axios.put(getEvent(params.event.event_id), formData)
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(URL.createObjectURL(e.target.files![0]));
    setFormValues({
      ...formValues,
      pic: e.target.files![0],
      imgChanged: true,
    });
  };

  const handleClubNameChange = (
    e: React.SyntheticEvent<Element, Event>,
    value: string | null,
  ) => {
    const club = clubsList.get(value ?? "");
    setFormValues({
      ...formValues,
      club_id: club ?? "",
      club_name: value ?? "",
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
    axios.get(clubs).then((response) => {
      const list = new Map<string, string>(
        response.data.map((club: IClub) => {
          return [club.club_name, club.club_id];
        }),
      );
      setClubs(list);
    });
  }, []);

  React.useEffect(() => {
    if (params.event.event_id) {
      setFormValues({
        ...formValues,
        name: params.event.event_name ?? "",
        pic: undefined,
        imgChanged: false,
        short_description: params.event.event_short_description ?? "",
        description: params.event.event_description ?? "",
        date: dateParserForInputs(params.event.event_date),
        time: params.event.event_time ?? "",
        place: params.event.event_place ?? "",
        datetime: params.event.event_datetime ?? "",
        price: params.event.event_price,
        follower_price: params.event.event_price_follower,
        club_id: params.event.event_club_id ?? "",
        club_name: params.event.club_name ?? "",
      });
      setImageUrl(params.event.event_pic);
    }
  }, [params.event]);

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
        <form onSubmit={sendFormData}>
          <DialogTitle id={"EventDialogTitle"}>{"Éditer un event"}</DialogTitle>
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
                sx={{ mt: 4 }}
                fullWidth
                required
                multiline
                rows={6}
              />
              <Stack>
                <TextField
                  name="price"
                  label="Prix standard"
                  variant="standard"
                  type="number"
                  inputProps={{ min: 0 }}
                  value={formValues.price ?? ""}
                  onChange={handleInputChange}
                  sx={{ mt: 1, ml: 4 }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">€</InputAdornment>
                    ),
                  }}
                />
                <TextField
                  name="follower_price"
                  label="Prix adhérent"
                  variant="standard"
                  type="number"
                  inputProps={{ min: 0 }}
                  value={formValues.follower_price ?? ""}
                  onChange={handleInputChange}
                  sx={{ mt: 1, ml: 4 }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">€</InputAdornment>
                    ),
                  }}
                />
              </Stack>
            </Stack>
            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={12} md={6}>
                <TextField
                  id="Event_description"
                  name="description"
                  label="Description"
                  value={formValues.description}
                  onChange={handleInputChange}
                  style={{ width: "100%" }}
                  multiline
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={1} alignItems="center">
                  <Box textAlign={"center"}>
                    <Input
                      type="file"
                      id="Event_image"
                      name="pic"
                      onChange={handleImageChange}
                      style={{ display: "none" }}
                    />
                    {imageUrl && (
                      <Box maxWidth={"100%"}>
                        <img src={imageUrl} alt={"Event"} height="100px" />
                      </Box>
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
