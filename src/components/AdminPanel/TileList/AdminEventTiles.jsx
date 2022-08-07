import * as React from "react";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import EventTile from "../Tile/AdminEventTile";
import axios from "axios";
import { events } from "../../../routes/roots";
import { Box, Button, Typography } from "@mui/material";
const EventForm = React.lazy(() => import("../Forms/EventForm"));

export default function AdminEventTiles() {
  const [eventList, setEvents] = useState([]);
  const [openForm, setOpenForm] = React.useState(false);

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
        {eventList.map(
          ({
            event_id,
            event_name,
            event_short_description,
            event_description,
            event_pic,
            event_date,
            event_time,
            event_datetime,
            event_price,
            event_place,
            event_club_id,
            club_name,
          }) => (
            <EventTile
              key={event_id}
              id={event_id}
              name={event_name}
              short_desc={event_short_description}
              description={event_description}
              pic={event_pic}
              date={event_date}
              time={event_time}
              datetime={event_datetime}
              price={event_price}
              place={event_place}
              club_id={event_club_id}
              club_name={club_name}
            />
          )
        )}
      </Grid>
      <EventForm
        action="Créer"
        open={openForm}
        setOpen={setOpenForm}
        eventObject={{}}
      ></EventForm>
    </Container>
  );
}
