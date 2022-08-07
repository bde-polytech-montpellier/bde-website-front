import { useEffect, useState } from "react";
import { Container } from "@mui/system";
import EventTiles from "./EventTiles";
import { events } from "../../routes/roots";
import axios from "axios";
import { Box, CssBaseline, Divider, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Footer from "../Footer";

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
        <Container>
          <Divider>NEXT EVENTS</Divider>
        </Container>
        <EventTiles cards={eventList}></EventTiles>
        <Container>
          <Divider orientation="horizontal">PAST EVENTS</Divider>
        </Container>
        {/* <Tiles cards={pastEvents}></Tiles> */}
      </main>
      <Footer />
    </ThemeProvider>
  );
}
