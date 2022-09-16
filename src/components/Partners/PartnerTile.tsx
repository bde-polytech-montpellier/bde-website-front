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
  IconButton,
  Stack,
} from "@mui/material";
import { AlternateEmail, Link } from "@mui/icons-material";
import { getPartner } from "../../routes/partners-api";
import noImage from "../../static/no-image.webp";
import { IPartnerTile, IPartner } from "../../models/tiles";

export default function Tile(params: IPartnerTile) {
  const [open, setOpen] = React.useState(false);
  const [partner, setPartner] = React.useState<IPartner>({
    partner_id: params.partner.partner_id,
    partner_name: params.partner.partner_name,
    partner_pic: params.partner.partner_pic,
    partner_short_description: params.partner.partner_short_description,
    partner_description:
      params.partner.partner_description ?? "Aucune description",
    partner_mail: params.partner.partner_mail,
    partner_website: params.partner.partner_website,
  });

  const handleClickOpen = async () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid item key={partner.partner_id} xs={6} sm={4} md={3}>
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
            image={partner.partner_pic ?? noImage}
            alt="random"
          />
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography gutterBottom variant="h5" component="h2">
              {partner.partner_name}
            </Typography>
            <Typography>{partner.partner_short_description}</Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Stack sx={{ width: 1 }}>
            <Stack direction="row" spacing={1}>
              <IconButton
                aria-label="email"
                href={"mailto:" + partner.partner_mail}
                color="primary"
                disabled={!partner.partner_mail}
              >
                <AlternateEmail />
              </IconButton>
              <IconButton
                color="secondary"
                href={partner.partner_website ?? ""}
                disabled={!partner.partner_website}
              >
                <Link />
              </IconButton>
            </Stack>
            {params.TileActions && (
              <params.TileActions
                api={getPartner(partner.partner_id!)}
                entity={partner}
                setInfo={setPartner}
                openForm={params.openForm}
              />
            )}
          </Stack>
        </CardActions>
      </Card>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{partner.partner_name}</DialogTitle>
        <Divider orientation="horizontal" flexItem />
        <DialogContent>
          {partner.partner_description!.split("\r\n").map((str, idx) => (
            <DialogContentText key={idx}>{str}</DialogContentText>
          ))}
        </DialogContent>
        <Divider orientation="horizontal" flexItem />
        <DialogActions>
          <Button onClick={handleClose}>Fermer</Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
