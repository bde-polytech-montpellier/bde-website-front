import { useState, useEffect } from "react";
import axios from "axios";
import * as React from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import ClubTile from "../../Clubs/ClubTile";
import { Box, Button, Typography } from "@mui/material";
import { clubs } from "../../../routes/roots";
import ClubForm from "../Forms/ClubForm";
import { IClub } from "../../../models/tiles";

export default function AdminClubTiles() {
  const [clubLists, setClubs] = useState([]);
  const [openForm, setOpenForm] = React.useState(false);

  const handleSetOpenForm = () => {
    setOpenForm(true);
  };
  function getClubs() {
    axios.get(clubs).then((res) => {
      setClubs(res.data);
    });
  }

  useEffect(() => {
    getClubs();
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
        {"Les clubs"}
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
        {clubLists.map((club: IClub) => (
          <ClubTile key={club.club_id!} club={club} />
        ))}
      </Grid>
      <ClubForm open={openForm} setOpen={setOpenForm} club={{}} />
    </Container>
  );
}
