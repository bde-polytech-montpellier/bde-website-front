import * as React from "react";
import { useEffect, useState } from "react";
import EventTile from "./EventTile";
import { events } from "../../routes/roots";
import axios from "axios";
import { EventResponse } from "../../models/event";
import CardContainer from "../templates/CardContainer";

export default function Events() {
  const [eventList, setEvents] = useState([]);

  async function getEvents() {
    const eventsList = await axios.get(events);
    setEvents(eventsList.data);
  }

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <CardContainer
      title="Les Events"
      subtitle="De quoi t'occuper !"
      cards={eventList.map((event: EventResponse) => (
        <EventTile key={event.event_id} event={event} />
      ))}
    />
  );
}
