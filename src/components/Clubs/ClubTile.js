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
  Stack,
  IconButton,
} from "@mui/material";
import { Facebook, Instagram } from "@mui/icons-material";
import { getClub } from "../../routes/clubs-api";
import noImage from "../../static/no-image.webp";

export default function Tile({
  id,
  title,
  pic,
  short_desc,
  description,
  fb,
  ig,
  TileActions = () => {},
  ClubForm = () => {},
}) {
  const [open, setOpen] = React.useState(false);

  const defaultValues = {
    id: id,
    name: title,
    pic: pic,
    short_desc: short_desc,
    description: description ?? "Aucune description",
    fb: fb,
    ig: ig,
  };

  const [club, setClub] = React.useState(defaultValues);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
            sx={{
              pt: 0,
              height: 200,
            }}
            image={club.pic ?? noImage}
            alt="random"
          />
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography gutterBottom variant="h5" component="h2">
              {club.name}
            </Typography>
            <Typography>{club.short_desc}</Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Stack sx={{ width: 1 }}>
            <Stack direction="row" spacing={2}>
              <IconButton
                color="primary"
                aria-label="facebook"
                href={club.fb}
                disabled={!club.fb}
              >
                <Facebook />
              </IconButton>
              <IconButton
                color="error"
                aria-label="instagram"
                href={club.ig}
                disabled={!club.ig}
              >
                <Instagram />
              </IconButton>
            </Stack>
            <TileActions
              api={getClub(id)}
              entity={club}
              Form={ClubForm}
              setInfo={setClub}
            />
          </Stack>
        </CardActions>
      </Card>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{club.name}</DialogTitle>
        <Divider flexItem />
        <DialogContent>
          <DialogContentText>{club.description}</DialogContentText>
        </DialogContent>
        <Divider flexItem />
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
