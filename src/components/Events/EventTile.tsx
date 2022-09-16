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
  CardHeader,
  Avatar,
  Chip,
} from "@mui/material";
import { CalendarMonth, AccessTime, Place } from "@mui/icons-material";
import { getEvent } from "../../routes/events-api";
import { red } from "@mui/material/colors";
import { dateParser } from "../../utils/dateParser";
import noImage from "../../static/no-image.webp";
import { IEventTile, IEvent } from "../../models/tiles";

function displayPrice(price?: number, followerPrice?: number) {
  if (price === null) {
    return (
      <Typography variant="h6" align="right">
        Prix non défini
      </Typography>
    );
  }

  if (price === 0) {
    return (
      <Typography variant="h6" align="right">
        Gratuit
      </Typography>
    );
  }

  return (
    <div>
      <Typography variant="h6" align="right">
        {price + "€ (adhérent " + (followerPrice ?? 0) + "€)"}
      </Typography>
    </div>
  );
}

export default function Tile(params: IEventTile) {
  const [open, setOpen] = React.useState(false);
  const [event, setEvent] = React.useState<IEvent>({
    event_id: params.event.event_id,
    event_name: params.event.event_name,
    event_pic: params.event.event_pic,
    event_short_description: params.event.event_short_description,
    event_description: params.event.event_description ?? "Aucune description",
    event_date: params.event.event_date,
    event_time: params.event.event_time,
    event_datetime: params.event.event_datetime ?? "Date non défnie",
    event_place: params.event.event_place,
    event_price: params.event.event_price,
    event_follower_price: params.event.event_follower_price,
    event_club_id: params.event.event_club_id,
    club_name: params.event.club_name,
  });

  function displayDate() {
    if (event.event_date && event.event_date!.length > 0)
      return dateParser(event.event_date);
    else return event.event_datetime;
  }

  const handleClickOpen = async () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid item key={event.event_id} xs={6} sm={4} md={3}>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <CardActionArea onClick={handleClickOpen}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                {(event.club_name ?? "BDE").charAt(0)}
              </Avatar>
            }
            title={event.club_name ?? "BDE"}
            subheader={displayDate()}
          />
          <CardMedia
            component="img"
            image={event.event_pic ?? noImage}
            alt="random"
          />
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography gutterBottom variant="h5">
              {event.event_name}
            </Typography>
            {displayPrice(event.event_price, event.event_follower_price)}
            <Typography>{event.event_short_description}</Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          {params.TileActions && (
            <params.TileActions
              api={getEvent(event.event_id!)}
              entity={event}
              setInfo={setEvent}
              openForm={params.openForm}
            />
          )}
        </CardActions>
      </Card>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {event.event_name}
          <Stack direction={{ xs: "column", md: "row" }} spacing={1}>
            {event.event_place && (
              <Chip icon={<Place />} label={event.event_place} size="small" />
            )}
            {event.event_date && (
              <Chip
                icon={<CalendarMonth />}
                label={dateParser(event.event_date)}
                size="small"
              />
            )}
            {event.event_time && (
              <Chip
                icon={<AccessTime />}
                label={event.event_time}
                size="small"
              />
            )}
          </Stack>
        </DialogTitle>
        <Divider flexItem />
        <DialogContent>
          <DialogContentText>{event.event_description}</DialogContentText>
        </DialogContent>
        <Divider flexItem />
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
