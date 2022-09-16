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
import { IClubTile, IClub } from "../../models/tiles";

export default function ClubTile(params: IClubTile) {
  const [open, setOpen] = React.useState(false);

  const [club, setClub] = React.useState<IClub>({
    club_id: params.club.club_id,
    club_name: params.club.club_name,
    club_pic: params.club.club_pic,
    club_short_description: params.club.club_short_description,
    club_description: params.club.club_description,
    club_fb: params.club.club_fb,
    club_ig: params.club.club_ig,
  });

  const openEditForm = () => {
    params.setInfo!(club);
    params.openForm!(true);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid item key={club.club_id} xs={6} sm={4} md={3}>
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
            image={club.club_pic ?? noImage}
            alt="random"
          />
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography gutterBottom variant="h5" component="h2">
              {club.club_name}
            </Typography>
            <Typography>{club.club_short_description}</Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Stack sx={{ width: 1 }}>
            <Stack direction="row" spacing={2}>
              <IconButton
                color="primary"
                aria-label="facebook"
                href={club.club_fb ?? ""}
                disabled={!club.club_fb}
              >
                <Facebook />
              </IconButton>
              <IconButton
                color="error"
                aria-label="instagram"
                href={club.club_ig ?? ""}
                disabled={!club.club_ig}
              >
                <Instagram />
              </IconButton>
            </Stack>
            {params.TileActions && (
              <params.TileActions
                api={getClub(club.club_id!)}
                entity={club}
                setInfo={setClub}
                openForm={openEditForm}
              />
            )}
          </Stack>
        </CardActions>
      </Card>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{club.club_name}</DialogTitle>
        <Divider flexItem />
        <DialogContent>
          <DialogContentText>{club.club_description}</DialogContentText>
        </DialogContent>
        <Divider flexItem />
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
