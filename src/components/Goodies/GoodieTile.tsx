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
import { IGoodieTile, IGoodie } from "../../models/tiles";

export default function GoodieTile(params: IGoodieTile) {
  const [open, setOpen] = React.useState(false);
  const [goodie, setGoodie] = React.useState<IGoodie>({
    goodie_id: params.goodie.goodie_id,
    goodie_name: params.goodie.goodie_name,
    goodie_pic: params.goodie.goodie_pic,
    goodie_description:
      params.goodie.goodie_description ?? "Aucune description",
    goodie_price: params.goodie.goodie_price,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const goodiePrice = (price?: number) => {
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
    <Grid item key={goodie.goodie_id} xs={6} sm={4} md={3}>
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
            image={goodie.goodie_pic ?? noImage}
            alt="random"
          />
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography gutterBottom variant="h5" component="h2">
              {goodie.goodie_name}
            </Typography>
            {goodiePrice(goodie.goodie_price)}
          </CardContent>
        </CardActionArea>
        <CardActions>
          {params.TileActions && (
            <params.TileActions
              api={getGoodie(goodie.goodie_id!)}
              entity={goodie}
              setInfo={setGoodie}
              openForm={params.openForm}
            />
          )}
        </CardActions>
      </Card>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{goodie.goodie_name}</DialogTitle>
        <Divider flexItem />
        <DialogContent>
          <DialogContentText>{goodie.goodie_description}</DialogContentText>
        </DialogContent>
        <Divider flexItem />
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
