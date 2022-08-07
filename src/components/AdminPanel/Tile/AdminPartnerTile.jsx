import * as React from "react";
import TileActions from "./TileActions";
import PartnerTile from "../../Partners/PartnerTile";
const PartnerForm = React.lazy(() => import("../Forms/PartnerForm"));

export default function Tile({
  id,
  name,
  pic,
  short_desc,
  description,
  mail,
  website_url,
}) {
  return (
    <PartnerTile
      id={ id }
      name={ name }
      pic={ pic }
      short_desc={ short_desc }
      description={ description }
      mail={ mail }
      website_url={ website_url }
      TileActions={ TileActions }
      PartnerForm={ PartnerForm }
    />
  );
}
