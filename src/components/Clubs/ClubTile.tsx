import * as React from "react";
import { Typography, Stack, IconButton } from "@mui/material";
import { Facebook, Instagram } from "@mui/icons-material";
import { getClub } from "../../routes/clubs-api";
import { ClubTileActions, ClubResponse } from "../../models/club";
import Card from "../templates/Card";

export default function ClubTile(params: ClubTileActions) {
  const [club, setClub] = React.useState<ClubResponse>({
    club_id: params.club.club_id,
    club_name: params.club.club_name,
    club_pic: params.club.club_pic,
    club_short_description: params.club.club_short_description,
    club_description: params.club.club_description,
    club_fb: params.club.club_fb,
    club_ig: params.club.club_ig,
  });

  const openEditForm = () => {
    params.setInfo!(club);
    params.setOpenForm!(true);
  };

  const buildBody = () => (
    <Typography>{club.club_short_description}</Typography>
  );

  const buildFooter = () => (
    <Stack sx={{ width: 1 }}>
      <Stack direction="row" spacing={2}>
        <IconButton
          color="primary"
          aria-label="facebook"
          href={club.club_fb ?? ""}
          disabled={!club.club_fb}
        >
          <Facebook />
        </IconButton>
        <IconButton
          color="error"
          aria-label="instagram"
          href={club.club_ig ?? ""}
          disabled={!club.club_ig}
        >
          <Instagram />
        </IconButton>
      </Stack>
      {params.TileActions && (
        <params.TileActions
          api={getClub(club.club_id!)}
          entity={club}
          setInfo={setClub}
          openForm={openEditForm}
        />
      )}
    </Stack>
  );

  const buildDialogTitle = () => <div>{club.club_name}</div>;

  return (
    <Card
      id={club.club_id!}
      img={club.club_pic}
      name={club.club_name!}
      body={buildBody}
      footer={buildFooter}
      dialogTitle={buildDialogTitle}
      dialogBodyText={club.club_description!}
    />
  );
}
