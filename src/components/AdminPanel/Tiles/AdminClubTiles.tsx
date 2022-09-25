import { useState, useEffect } from "react";
import axios from "axios";
import * as React from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import ClubTile from "../../Clubs/ClubTile";
import TileActions from "../TileActions";
import { Box, Button, Typography } from "@mui/material";
import { clubs } from "../../../routes/roots";
import ClubForm from "../Forms/ClubForm";
import { ClubResponse } from "../../../models/club";

export default function AdminClubTiles() {
  const [clubLists, setClubs] = useState([]);
  const [openForm, setOpenForm] = React.useState(false);
  const [chosenClub, setChosenClub] = useState<ClubResponse>({
    club_id: undefined,
    club_name: undefined,
    club_short_description: undefined,
    club_description: undefined,
    club_pic: undefined,
    club_fb: undefined,
    club_ig: undefined,
  });

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
        {clubLists.map((club: ClubResponse) => (
          <ClubTile
            key={club.club_id!}
            club={club}
            setInfo={setChosenClub}
            TileActions={TileActions}
            setOpenForm={setOpenForm}
          />
        ))}
      </Grid>
      <ClubForm
        open={openForm}
        setOpenForm={setOpenForm}
        club={chosenClub}
        setInfo={setChosenClub}
      />
    </Container>
  );
}
