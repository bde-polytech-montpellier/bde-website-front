import { useState, useEffect } from "react";
import axios from "axios";
import { partners } from "../../routes/roots";
import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Tile from "./PartnerTile";
import Footer from "../Footer";
import { IPartner } from "../../models/tiles";

const theme = createTheme();

function Parts() {
  const [partnerships, setParts] = useState([]);

  async function getParts() {
    const parts = await axios.get(partners);
    setParts(parts.data);
  }

  useEffect(() => {
    getParts();
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
              {"Nos Partenariats"}
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              {"Des bons plans pour les étudiants"}
            </Typography>
          </Container>
        </Box>
        <Container sx={{ py: 0 }} maxWidth="lg">
          <Grid container spacing={4}>
            {partnerships.map((partner: IPartner) => (
              <Tile key={partner.partner_id} partner={partner} />
            ))}
          </Grid>
        </Container>
      </main>
      <Footer />
    </ThemeProvider>
  );
}

export default Parts;
