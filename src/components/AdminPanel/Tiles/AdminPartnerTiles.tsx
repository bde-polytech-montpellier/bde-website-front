import { useState, useEffect } from "react";
import axios from "axios";
import { partners } from "../../../routes/roots";
import * as React from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Tile from "../../Partners/PartnerTile";
import TileActions from "../TileActions";
import { Box, Button, Typography } from "@mui/material";
import { IPartner } from "../../../models/tiles";
const PartnerForm = React.lazy(() => import("../Forms/PartnerForm"));

export default function AdminPartnersTiles() {
  const [openForm, setOpenForm] = React.useState(false);
  const [partnerships, setParts] = useState([]);
  const [chosenPartner, setChosenPartner] = useState<IPartner>({
    partner_id: "",
    partner_name: "",
    partner_short_description: "",
    partner_description: "",
    partner_mail: "",
    partner_website: "",
  });

  async function getParts() {
    const parts = await axios.get(partners);
    setParts(parts.data);
  }

  const handleOpenForm = () => {
    setOpenForm(true);
  };

  useEffect(() => {
    getParts();
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
        {"Les partenaires"}
      </Typography>
      <Box textAlign={"center"}>
        <Button
          color="warning"
          variant="contained"
          sx={{ mb: 5 }}
          onClick={handleOpenForm}
        >
          Ajouter
        </Button>
      </Box>
      <Grid container spacing={4}>
        {partnerships.map((partner: IPartner) => (
          <Tile
            key={partner.partner_id!}
            partner={partner}
            TileActions={TileActions}
            setInfo={setChosenPartner}
            setOpenForm={setOpenForm}
          />
        ))}
      </Grid>
      <PartnerForm
        open={openForm}
        setOpenForm={setOpenForm}
        partner={chosenPartner}
      ></PartnerForm>
    </Container>
  );
}
