import * as React from "react";
import TileActions from "./TileActions";
import EventTile from "../../Events/EventTile";
const EventForm = React.lazy(() => import("../Forms/EventForm"));

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
  follower_price,
  place,
  club_id,
  club_name,
}) {
  return (
    <EventTile
      id={id}
      name={name}
      pic={pic}
      short_desc={short_desc}
      description={description}
      date={date}
      time={time}
      datetime={datetime}
      price={price}
      follower_price={follower_price}
      place={place}
      club_id={club_id}
      club_name={club_name}
      TileActions={TileActions}
      EventForm={EventForm}
    ></EventTile>
  );
}
