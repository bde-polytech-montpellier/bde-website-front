import * as React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CardActionArea,
  Divider,
} from "@mui/material";
import { getGoodie } from "../../routes/goodies-api";
import noImage from "../../static/no-image.webp";

export default function Tile({
  id,
  name,
  pic,
  description,
  price,
  TileActions = () => {},
  GoodieForm = () => {},
}) {
  const [open, setOpen] = React.useState(false);

  const defaultValues = {
    id: id,
    name: name,
    pic: pic,
    description: description ?? "Aucune description",
    price: price,
  };

  const [goodie, setGoodie] = React.useState(defaultValues);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const goodiePrice = (price) => {
    if (price === null)
      return (
        <Typography variant="h6" align="right">
          {"Prix non défini"}
        </Typography>
      );

    if (price === 0)
      return (
        <Typography variant="h6" align="right">
          {"Gratuit"}
        </Typography>
      );

    return (
      <Typography variant="h6" align="right">
        {price + "€"}
      </Typography>
    );
  };

  return (
    <Grid item key={id} xs={6} sm={4} md={3}>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <CardActionArea onClick={handleClickOpen}>
          <CardMedia
            component="img"
            image={goodie.pic ?? noImage}
            alt="random"
          />
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography gutterBottom variant="h5" component="h2">
              {goodie.name}
            </Typography>
            {goodiePrice(goodie.price)}
          </CardContent>
        </CardActionArea>
        <CardActions>
          <TileActions
            api={getGoodie(id)}
            entity={goodie}
            Form={GoodieForm}
            setInfo={setGoodie}
          />
        </CardActions>
      </Card>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{goodie.name}</DialogTitle>
        <Divider flexItem />
        <DialogContent>
          <DialogContentText>{goodie.description}</DialogContentText>
        </DialogContent>
        <Divider flexItem />
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
