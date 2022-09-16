import { useState, useEffect } from "react";
import axios from "axios";
import { goodies } from "../../routes/roots";
import * as React from "react";
import { CssBaseline, Grid, Box, Typography, Container } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import GoodieTile from "./GoodieTile";
import Footer from "../Footer";
import { IGoodie } from "../../models/tiles";

const theme = createTheme();

export default function Goodies() {
  const [goodieList, setGoodies] = useState([]);

  function getGoodies() {
    axios.get(goodies).then((res) => {
      setGoodies(res.data);
    });
  }

  useEffect(() => {
    getGoodies();
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
              {"Les Goodies"}
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              {"De petits souvenirs de ton séjour parmi nous !"}
            </Typography>
          </Container>
        </Box>
        <Container sx={{ py: 0 }} maxWidth="lg">
          <Grid container spacing={4}>
            {goodieList.map((goodie: IGoodie) => (
              <GoodieTile key={goodie.goodie_id} goodie={goodie} />
            ))}
          </Grid>
        </Container>
      </main>
      <Footer />
    </ThemeProvider>
  );
}
