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
import noImage from "../../static/no-image.webp"

export default function Tile({
  id,
  name,
  pic,
  short_desc,
  description,
  date,
  time,
  datetime,
  price,
  place,
  club_id,
  club_name,
  TileActions = () => {},
  EventForm = () => {},
}) {
  const [open, setOpen] = React.useState(false);

  const defaultValue = {
    id: id,
    name: name,
    pic: pic,
    short_desc: short_desc,
    description: description ?? "Aucune description",
    date: date,
    time: time,
    datetime: datetime ?? "Date non défnie",
    place: place,
    price: price,
    club_id: club_id,
    club_name: club_name,
  };

  const [event, setEvent] = React.useState(defaultValue);

  function displayDate() {
    if (event.date && event.date.length > 0) return dateParser(event.date);
    else return event.datetime;
  }

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
            image={event.pic ?? noImage}
            alt="random"
          />
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography gutterBottom variant="h5">
              {event.name}
            </Typography>
            <Typography gutterBottom variant="h6">
              {(event.price ?? 0) + "€"}
            </Typography>
            <Typography>{event.short_desc}</Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <TileActions
            api={getEvent(id)}
            entity={event}
            Form={EventForm}
            setInfo={setEvent}
          ></TileActions>
        </CardActions>
      </Card>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {event.name}
          <Stack direction={{xs: "column", md: "row"}} spacing={1}>
            <Chip icon={<Place />} label={event.place} size="small"></Chip>
            <Chip
              icon={<CalendarMonth />}
              label={event.date}
              size="small"
            ></Chip>
            <Chip icon={<AccessTime />} label={event.time} size="small"></Chip>
          </Stack>
        </DialogTitle>
        <Divider flexItem />
        <DialogContent>
          <DialogContentText>{event.description}</DialogContentText>
        </DialogContent>
        <Divider flexItem />
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
