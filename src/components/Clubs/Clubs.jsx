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

const theme = createTheme();

function Clubs() {
  const [clubList, setClubs] = useState([]);

  function getClubs() {
    axios.get(clubs).then(res => {
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
        {/* Hero unit */}
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
          {/* End hero unit */}
          <Grid container spacing={4}>
            {clubList.map(
              ({
                club_id,
                club_name,
                club_pic,
                club_short_description,
                club_description,
                club_fb,
                club_ig,
              }) => (
                <ClubTile
                  key={club_id}
                  id={club_id}
                  title={club_name}
                  pic={club_pic}
                  short_desc={club_short_description}
                  description={club_description}
                  fb={club_fb}
                  ig={club_ig}
                />
              )
            )}
          </Grid>
        </Container>
      </main>
      <Footer />
    </ThemeProvider>
  );
}

export default Clubs;
