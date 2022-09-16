import * as React from "react";
import { useEffect, useState } from "react";
import { Container } from "@mui/system";
import EventTile from "./EventTile";
import { events } from "../../routes/roots";
import axios from "axios";
import { Box, CssBaseline, Grid, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Footer from "../Footer";
import { IEvent } from "../../models/tiles";

export default function Events() {
  const [eventList, setEvents] = useState([]);

  const theme = createTheme();

  async function getEvents() {
    const eventsList = await axios.get(events);
    setEvents(eventsList.data);
  }

  useEffect(() => {
    getEvents();
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 4,
            pb: 0,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              {"Les Events"}
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              {"De quoi t'occuper !"}
            </Typography>
          </Container>
        </Box>
        <Container sx={{ py: 0 }} maxWidth="lg">
          <Grid container spacing={4}>
            {eventList.map((event: IEvent) => (
              <EventTile key={event.event_id} event={event} />
            ))}
          </Grid>
        </Container>
      </main>
      <Footer />
    </ThemeProvider>
  );
}
