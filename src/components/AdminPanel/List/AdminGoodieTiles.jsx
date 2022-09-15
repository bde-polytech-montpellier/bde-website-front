import { useState, useEffect } from "react";
import axios from "axios";
import * as React from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import GoodieTile from "../Tile/AdminGoodieTile";
import { Box, Button, Typography } from "@mui/material";
import { goodies } from "../../../routes/roots";
const GoodieForm = React.lazy(() => import("../Forms/GoodieForm"));

export default function AdminGoodieTiles() {
  const [goodieLists, setGoodies] = useState([]);
  const [openForm, setOpenForm] = React.useState(false);

  const handleSetOpenForm = () => {
    setOpenForm(true);
  };
  function getGoodies() {
    axios.get(goodies).then((res) => {
      setGoodies(res.data);
    });
  }

  useEffect(() => {
    getGoodies();
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
        {"Les goodies"}
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
        {goodieLists.map(
          ({
            goodie_id,
            goodie_name,
            goodie_pic,
            goodie_description,
            goodie_price,
          }) => (
            <GoodieTile
              key={goodie_id}
              id={goodie_id}
              name={goodie_name}
              pic={goodie_pic}
              description={goodie_description}
              price={goodie_price}
            />
          )
        )}
      </Grid>
      <GoodieForm
        action="Créer"
        open={openForm}
        setOpen={setOpenForm}
        goodieObject={{}}
      />
    </Container>
  );
}
