import * as React from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import EventTile from "./EventTile";

export default function Tiles({ cards }) {
  return (
    <Container sx={{ py: 0 }} maxWidth="lg">
      {/* End hero unit */}
      <Grid container spacing={4}>
        {cards.map(
          ({
            event_id,
            event_name,
            event_pic,
            event_short_description,
            event_description,
            event_date,
            event_time,
            event_datetime,
            event_price,
            event_price_follower,
            event_place,
            event_club_id,
            club_name,
          }) => (
            <EventTile
              key={event_id}
              id={event_id}
              name={event_name}
              pic={event_pic}
              short_desc={event_short_description}
              description={event_description}
              date={event_date}
              time={event_time}
              datetime={event_datetime}
              price={event_price}
              follower_price={event_price_follower}
              place={event_place}
              club_id={event_club_id}
              club_name={club_name}
            />
          )
        )}
      </Grid>
    </Container>
  );
}
