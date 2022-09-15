import * as React from "react";
import GoodieTile from "../../Goodies/GoodieTile";
import TileActions from "./TileActions";
const GoodieForm = React.lazy(() => import("../Forms/GoodieForm"));

export default function Tile({ id, name, pic, description, price }) {
  return (
    <GoodieTile
      id={id}
      name={name}
      pic={pic}
      description={description}
      price={price}
      TileActions={TileActions}
      GoodieForm={GoodieForm}
    />
  );
}
