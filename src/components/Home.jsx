import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Footer from "./Footer";
import teamBde from "../static/teamBde.webp";

const theme = createTheme();

function Home() {
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
          <Container maxWidth="md">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              {"BDE Polytech Montpellier"}
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            ></Typography>
          </Container>
        </Box>
        <Container sx={{ py: 0, textAlign: "center" }} maxWidth="lg">
          <Box>
            <img src={teamBde} alt="team bde" style={{width: "100%", maxWidth: "600px"}}></img>
          </Box>
        </Container>
      </main>
      <Footer />
    </ThemeProvider>
  );
}

export default Home;
