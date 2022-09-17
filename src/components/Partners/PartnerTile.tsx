import * as React from "react";
import { Typography, IconButton, Stack } from "@mui/material";
import { AlternateEmail, Link } from "@mui/icons-material";
import { getPartner } from "../../routes/partners-api";
import { IPartnerTile, IPartner } from "../../models/tiles";
import Card from "../templates/Card";

export default function PartnerTile(params: IPartnerTile) {
  const [partner, setPartner] = React.useState<IPartner>({
    partner_id: params.partner.partner_id,
    partner_name: params.partner.partner_name,
    partner_pic: params.partner.partner_pic,
    partner_short_description: params.partner.partner_short_description,
    partner_description:
      params.partner.partner_description ?? "Aucune description",
    partner_mail: params.partner.partner_mail,
    partner_website: params.partner.partner_website,
  });

  const openEditForm = () => {
    params.setInfo!(partner);
    params.setOpenForm!(true);
  };

  const buildBody = () => (
    <Typography>{partner.partner_short_description}</Typography>
  );

  const buildDialogTitle = () => <div>{partner.partner_name}</div>;

  const buildFooter = () => {
    return (
      <Stack sx={{ width: 1 }}>
        <Stack direction="row" spacing={1}>
          <IconButton
            aria-label="email"
            href={"mailto:" + partner.partner_mail}
            color="primary"
            disabled={!partner.partner_mail}
          >
            <AlternateEmail />
          </IconButton>
          <IconButton
            color="secondary"
            href={partner.partner_website ?? ""}
            disabled={!partner.partner_website}
          >
            <Link />
          </IconButton>
        </Stack>
        {params.TileActions && (
          <params.TileActions
            api={getPartner(partner.partner_id!)}
            entity={partner}
            setInfo={setPartner}
            openForm={openEditForm}
          />
        )}
      </Stack>
    );
  };

  return (
    <Card
      id={partner.partner_id!}
      img={partner.partner_pic}
      name={partner.partner_name!}
      body={buildBody}
      dialogTitle={buildDialogTitle}
      dialogBodyText={partner.partner_description!}
      footer={buildFooter}
    />
  );
}
