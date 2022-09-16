import * as React from "react";
import TileActions from "./TileActions";
import PartnerTile from "../../Partners/PartnerTile";
import { IPartner } from "../../../models/tiles";

export default function Tile(partner: IPartner) {
  return <PartnerTile partner={partner} TileActions={TileActions} />;
}
