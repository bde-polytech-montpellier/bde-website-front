import * as React from "react";
import { ICard } from "../../models/componentFacto";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CardActionArea,
  Divider,
} from "@mui/material";
import noImage from "../../static/no-image.webp";

export default function Tile(comps: ICard) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = async () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid item key={comps.id} xs={6} sm={4} md={3}>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <CardActionArea onClick={handleClickOpen}>
          <comps.header />
          <CardMedia
            component="img"
            image={comps.img ?? noImage}
            alt="random"
          />
          <CardContent sx={{ flexGrow: 1 }}>
            <comps.body />
          </CardContent>
        </CardActionArea>
        {comps.footer && (
          <CardActions>
            <comps.footer />
          </CardActions>
        )}
      </Card>
      <Dialog open={open} onClose={handleClose}>
        {comps.dialogTitle && (
          <div>
            <DialogTitle>
              <comps.dialogTitle />
            </DialogTitle>
            <Divider flexItem />
          </div>
        )}
        {comps.dialogBodyText && (
          <div>
            <DialogContent>
              <DialogContentText>
                <comps.dialogBodyText />
              </DialogContentText>
            </DialogContent>
            <Divider flexItem />
          </div>
        )}
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
