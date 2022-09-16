import * as React from "react";
import TileActions from "./TileActions";
import EventTile from "../../Events/EventTile";
import { IEvent } from "../../../models/tiles";

export default function Tile(event: IEvent) {
  return <EventTile event={event} TileActions={TileActions}></EventTile>;
}
