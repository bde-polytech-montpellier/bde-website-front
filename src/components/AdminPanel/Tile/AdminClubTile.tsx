import * as React from "react";
import ClubTile from "../../Clubs/ClubTile";
import TileActions from "./TileActions";
import { IClub } from "../../../models/tiles";

export default function AdminClubTile(club: IClub) {
  return <ClubTile club={club} TileActions={TileActions} />;
}
