import * as React from "react";
import { Typography, Stack, CardHeader, Avatar, Chip } from "@mui/material";
import { CalendarMonth, AccessTime, Place } from "@mui/icons-material";
import { getEvent } from "../../routes/events-api";
import { red } from "@mui/material/colors";
import { dateParser } from "../../utils/dateParser";
import { EventTileActions, EventResponse } from "../../models/event";
import Card from "../templates/Card";

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

export default function EventTile(params: EventTileActions) {
  const [event, setEvent] = React.useState<EventResponse>({
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
    event_price_follower: params.event.event_price_follower,
    event_club_id: params.event.event_club_id,
    club_name: params.event.club_name,
  });

  const openEditForm = () => {
    params.setInfo!(event);
    params.setOpenForm!(true);
  };

  function displayDate() {
    if (event.event_date && event.event_date!.length > 0)
      return dateParser(event.event_date);
    else return event.event_datetime;
  }

  const buildHeader = () => (
    <CardHeader
      avatar={
        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
          {(event.club_name ?? "BDE").charAt(0)}
        </Avatar>
      }
      title={event.club_name ?? "BDE"}
      subheader={displayDate()}
    />
  );

  const buildBody = () => (
    <div>
      {displayPrice(event.event_price, event.event_price_follower)}
      <Typography>{event.event_short_description}</Typography>
    </div>
  );

  const buildFooter = () => {
    if (params.TileActions)
      return (
        <params.TileActions
          api={getEvent(event.event_id!)}
          entity={event}
          setInfo={setEvent}
          openForm={openEditForm}
        />
      );
    else return <span />;
  };

  const buildDialogTitle = () => (
    <div>
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
          <Chip icon={<AccessTime />} label={event.event_time} size="small" />
        )}
      </Stack>
    </div>
  );

  return (
    <Card
      id={event.event_id!}
      img={event.event_pic}
      header={buildHeader}
      name={event.event_name!}
      body={buildBody}
      footer={buildFooter}
      dialogTitle={buildDialogTitle}
      dialogBodyText={event.event_description!}
    />
  );
}
