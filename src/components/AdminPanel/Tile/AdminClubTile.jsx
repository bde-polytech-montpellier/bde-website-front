import * as React from "react";
import ClubTile from "../../Clubs/ClubTile";
import TileActions from "./TileActions";
const ClubForm = React.lazy(() => import("../Forms/ClubForm"));

export default function Tile({ id, title, pic, short_desc, description, fb, ig }) {
  return (
    <ClubTile
      id={id}
      title={title}
      pic={pic}
      short_desc={ short_desc }
      description={description}
      fb={fb}
      ig={ig}
      TileActions={TileActions}
      ClubForm={ClubForm}
    />
  );
}
