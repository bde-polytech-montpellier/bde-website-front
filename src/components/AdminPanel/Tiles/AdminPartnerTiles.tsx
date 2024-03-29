import axios from "axios";
import { partners } from "../../../routes/roots";
import * as React from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Tile from "../../Partners/PartnerTile";
import TileActions from "../TileActions";
import { Box, Button, Typography } from "@mui/material";
import { PartnerResponse } from "../../../models/partner";
import PartnerForm from "../Forms/PartnerForm";

export default function AdminPartnersTiles() {
  const [openForm, setOpenForm] = React.useState<boolean>(false);
  const [partnerships, setParts] = React.useState<PartnerResponse[]>([]);
  const [chosenPartner, setChosenPartner] = React.useState<PartnerResponse>({
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

  React.useEffect(() => {
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
        {partnerships.map((partner: PartnerResponse) => (
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
        setInfo={setChosenPartner}
      ></PartnerForm>
    </Container>
  );
}
