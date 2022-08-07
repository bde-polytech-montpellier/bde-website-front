import { useState, useEffect } from "react";
import axios from "axios";
import * as React from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import ClubTile from "../Tile/AdminClubTile";
import { Box, Button, Typography } from "@mui/material";
import { clubs } from "../../../routes/roots";
const ClubForm = React.lazy(() => import("../Forms/ClubForm"));

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
        {clubLists.map(
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
      <ClubForm
        action="Créer"
        open={openForm}
        setOpen={setOpenForm}
        clubObject={{}}
      />
    </Container>
  );
}
