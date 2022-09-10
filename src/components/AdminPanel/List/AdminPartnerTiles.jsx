import { useState, useEffect } from "react";
import axios from "axios";
import {partners} from "../../../routes/roots";
import * as React from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Tile from "../Tile/AdminPartnerTile";
import { Box, Button, Typography } from "@mui/material";
const PartnerForm = React.lazy(() => import("../Forms/PartnerForm"));

export default function AdminPartnersTiles() {
  const [openForm, setOpenForm] = React.useState(false);
  const [partnerships, setParts] = useState([]);

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
        {partnerships.map(
          ({
            partenaire_id,
            partenaire_name,
            partenaire_pic,
            partenaire_short_description,
            partenaire_description,
            partenaire_mail,
            partenaire_website_url,
          }) => (
            <Tile
              key={partenaire_id}
              id={partenaire_id}
              name={partenaire_name}
              title={partenaire_name}
              pic={partenaire_pic}
              short_desc={partenaire_short_description}
              description={partenaire_description}
              mail={partenaire_mail}
              website_url={partenaire_website_url}
            />
          )
        )}
      </Grid>
      <PartnerForm
        action="Créer"
        open={openForm}
        setOpen={setOpenForm}
        partnerObject={{}}
      ></PartnerForm>
    </Container>
  );
}
