import { Card, CardContent, CardMedia, Typography } from "@mui/material";

export default function Member({ name, image }) {
  return (
    <Card sx={{ maxWidth: 250 }}>
      <CardMedia
        component="img"
        image={image}
        alt="prevention team member"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
      </CardContent>
    </Card>
  );
}
