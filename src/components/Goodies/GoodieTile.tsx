import * as React from "react";
import { Typography } from "@mui/material";
import { getGoodie } from "../../routes/goodies-api";
import { IGoodieTile, IGoodie } from "../../models/tiles";
import Card from "../templates/Card";

const goodiePrice = (price?: number) => {
  if (price === null)
    return (
      <Typography variant="h6" align="right">
        {"Prix non défini"}
      </Typography>
    );

  if (price === 0)
    return (
      <Typography variant="h6" align="right">
        {"Gratuit"}
      </Typography>
    );

  return (
    <Typography variant="h6" align="right">
      {price + "€"}
    </Typography>
  );
};

export default function GoodieTile(params: IGoodieTile) {
  const [goodie, setGoodie] = React.useState<IGoodie>({
    goodie_id: params.goodie.goodie_id,
    goodie_name: params.goodie.goodie_name,
    goodie_pic: params.goodie.goodie_pic,
    goodie_description:
      params.goodie.goodie_description ?? "Aucune description",
    goodie_price: params.goodie.goodie_price,
  });

  const openEditForm = () => {
    params.setInfo!(goodie);
    params.setOpenForm!(true);
  };

  const buildBody = () => <div>{goodiePrice(goodie.goodie_price)}</div>;

  const buildFooter = () => {
    if (params.TileActions)
      return (
        <params.TileActions
          api={getGoodie(goodie.goodie_id!)}
          entity={goodie}
          setInfo={setGoodie}
          openForm={openEditForm}
        />
      );
    else return <span />;
  };

  const buildDialogTitle = () => <div>{goodie.goodie_name}</div>;

  return (
    <Card
      id={goodie.goodie_id!}
      img={goodie.goodie_pic}
      name={goodie.goodie_name!}
      body={buildBody}
      footer={buildFooter}
      dialogTitle={buildDialogTitle}
      dialogBodyText={goodie.goodie_description!}
    />
  );
}
