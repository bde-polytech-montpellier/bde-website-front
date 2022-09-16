import * as React from "react";
import GoodieTile from "../../Goodies/GoodieTile";
import TileActions from "./TileActions";
import { IGoodie } from "../../../models/tiles";

export default function Tile(goodie: IGoodie) {
  return <GoodieTile goodie={goodie} TileActions={TileActions} />;
}
