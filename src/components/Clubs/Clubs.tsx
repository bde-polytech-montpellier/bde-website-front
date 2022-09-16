import { useState, useEffect } from "react";
import axios from "axios";
import { clubs } from "../../routes/roots";
import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ClubTile from "./ClubTile";
import Footer from "../Footer";
import { IClub } from "../../models/tiles";

const theme = createTheme();

function Clubs() {
  const [clubList, setClubs] = useState<IClub[]>([]);

  function getClubs() {
    axios.get(clubs).then((res) => {
      setClubs(res.data);
    });
  }

  useEffect(() => {
    getClubs();
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
              {"Les Clubs"}
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              {"De quoi t'occuper à Polytech !"}
            </Typography>
          </Container>
        </Box>
        <Container sx={{ py: 0 }} maxWidth="lg">
          <Grid container spacing={4}>
            {clubList.map((club: IClub) => (
              <ClubTile key={club.club_id} club={club} />
            ))}
          </Grid>
        </Container>
      </main>
      <Footer />
    </ThemeProvider>
  );
}

export default Clubs;
