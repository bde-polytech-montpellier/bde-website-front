import * as React from "react";
import {
  Button,
  Stack,
  Container,
  Typography,
  Box,
  CssBaseline,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import {
  LocalActivity,
  MedicalServices,
  Handshake,
  Groups,
  ManageAccounts,
  AddShoppingCart,
} from "@mui/icons-material";
import theme from "../../colors/palette";
import Footer from "../Footer";

const ClubTiles = React.lazy(() => import("./List/AdminClubTiles"));
const EventTiles = React.lazy(() => import("./List/AdminEventTiles"));
const PartnerTiles = React.lazy(() => import("./List/AdminPartnerTiles"));
const Users = React.lazy(() => import("./List/AdminUsers"));
const Goodies = React.lazy(() => import("./List/AdminGoodieTiles"));

function getCards(type: string) {
  switch (type) {
    case "clubs":
      return <ClubTiles />;
    case "events":
      return <EventTiles />;
    case "partners":
      return <PartnerTiles />;
    case "users":
      return <Users />;
    case "goodies":
      return <Goodies />;
    default:
      return null;
  }
}

function AdminPanel() {
  const [cardType, setCardType] = React.useState("");

  const clubsClick = () => {
    setCardType("clubs");
  };
  const eventsClick = () => {
    setCardType("events");
  };
  const partnersClick = () => {
    setCardType("partners");
  };
  const usersClick = () => {
    setCardType("users");
  };
  const goodiesClick = () => {
    setCardType("goodies");
  };

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
              {"Administration"}
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              {"Gestion du contenu"}
            </Typography>
            <Stack
              direction="row"
              spacing={2}
              justifyContent="center"
              alignItems="center"
            >
              <Button variant="contained" color="blue" onClick={clubsClick}>
                <Groups />
              </Button>
              <Button
                variant="contained"
                color="purple"
                onClick={partnersClick}
              >
                <Handshake />
              </Button>
              <Button variant="contained" color="red">
                <MedicalServices />
              </Button>
              <Button variant="contained" color="green" onClick={eventsClick}>
                <LocalActivity />
              </Button>
              <Button variant="contained" color="greeny" onClick={usersClick}>
                <ManageAccounts />
              </Button>
              <Button variant="contained" color="pink" onClick={goodiesClick}>
                <AddShoppingCart />
              </Button>
            </Stack>
          </Container>
        </Box>
        <Container id="admin_panel_cards" maxWidth="lg">
          {getCards(cardType)}
        </Container>
      </main>
      <Footer />
    </ThemeProvider>
  );
}

export default AdminPanel;
