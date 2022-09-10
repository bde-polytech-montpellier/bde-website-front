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

export default function Tile({
  id,
  name,
  pic,
  short_desc,
  description,
  mail,
  website_url,
  TileActions = () => {},
  PartnerForm = () => {},
}) {
  const [open, setOpen] = React.useState(false);

  const defaultValue = {
    id: id,
    name: name,
    pic: pic,
    short_desc: short_desc,
    description: description ?? "Aucune description",
    mail: mail,
    website: website_url,
  };

  const [partner, setPartner] = React.useState(defaultValue);

  const handleClickOpen = async () => {
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
            image={partner.pic ?? noImage}
            alt="random"
          />
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography gutterBottom variant="h5" component="h2">
              {name}
            </Typography>
            <Typography>{short_desc}</Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Stack sx={{ width: 1 }}>
            <Stack direction="row" spacing={1}>
              <IconButton
                aria-label="email"
                href={"mailto:" + mail}
                color="primary"
                disabled={!mail}
              >
                <AlternateEmail />
              </IconButton>
              <IconButton
                color="secondary"
                href={website_url}
                disabled={!website_url}
              >
                <Link />
              </IconButton>
            </Stack>
            <TileActions
              api={getPartner(id)}
              entity={partner}
              Form={PartnerForm}
              setInfo={setPartner}
            ></TileActions>
          </Stack>
        </CardActions>
      </Card>
      {/* Partner description */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{partner.name}</DialogTitle>
        <Divider orientation="horizontal" flexItem />
        <DialogContent>
          <DialogContentText>
            {partner.description.split("\r\n").map((str, idx) => (
              <p key={idx}>{str}</p>
            ))}
          </DialogContentText>
        </DialogContent>
        <Divider orientation="horizontal" flexItem />
        <DialogActions>
          <Button onClick={handleClose}>Fermer</Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
