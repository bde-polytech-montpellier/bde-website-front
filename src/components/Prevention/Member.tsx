import * as React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { IPrevTeam } from "../../models/tiles";

export default function Member(member: IPrevTeam) {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        maxWidth: 250,
      }}
    >
      <CardMedia
        component="img"
        image={member.img}
        alt="prevention team member"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {member.name}
        </Typography>
      </CardContent>
    </Card>
  );
}
