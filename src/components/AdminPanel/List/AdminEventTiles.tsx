import * as React from "react";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import EventTile from "../Tile/AdminEventTile";
import axios from "axios";
import { events } from "../../../routes/roots";
import { Box, Button, Typography } from "@mui/material";
import EventForm from "../Forms/EventForm";
import { IEvent } from "../../../models/tiles";

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
        {eventList.map((event: IEvent) => (
          <EventTile key={event.event_id} event={event} />
        ))}
      </Grid>
      <EventForm open={openForm} setOpen={setOpenForm} event={{}}></EventForm>
    </Container>
  );
}
