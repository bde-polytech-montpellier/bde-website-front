import * as React from "react";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import EventTile from "../../Events/EventTile";
import TileActions from "../TileActions";
import axios from "axios";
import { events } from "../../../routes/roots";
import { Box, Button, Typography } from "@mui/material";
import EventForm from "../Forms/EventForm";
import { IEvent } from "../../../models/tiles";

export default function AdminEventTiles() {
  const [eventList, setEvents] = useState([]);
  const [openForm, setOpenForm] = React.useState(false);
  const [chosenEvent, setChosenEvent] = React.useState<IEvent>({
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

  const handleSetOpenForm = () => {
    setOpenForm(true);
  };

  async function getEvents() {
    const eventsList = await axios.get(events);

    setEvents(eventsList.data);
  }

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <Container sx={{ py: 10 }} maxWidth="lg">
      <Typography
        component="h1"
        variant="h4"
        align="center"
        color="text.primary"
        gutterBottom
      >
        {"Les Events"}
      </Typography>
      <Box textAlign={"center"}>
        <Button
          color="warning"
          variant="contained"
          sx={{ mb: 5 }}
          onClick={handleSetOpenForm}
        >
          Ajouter
        </Button>
      </Box>
      <Grid container spacing={4}>
        {eventList.map((event: IEvent) => (
          <EventTile
            key={event.event_id}
            event={event}
            TileActions={TileActions}
            setInfo={setChosenEvent}
            setOpenForm={setOpenForm}
          />
        ))}
      </Grid>
      <EventForm
        open={openForm}
        setOpenForm={setOpenForm}
        event={chosenEvent}
      ></EventForm>
    </Container>
  );
}
