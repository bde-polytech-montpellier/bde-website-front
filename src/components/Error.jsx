import { CssBaseline, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";

function Error() {
  return (
    <main>
      <CssBaseline />
      {/* Hero unit */}
      <Box
        sx={{
          bgcolor: "background.paper",
          pt: 4,
          pb: 0,
          height: "100%",
        }}
        alignItems={"center"}
      >
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            {"Page inexistante"}
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="text.secondary"
            paragraph
          >
            {"Kes'tu viens fèr issi ?"}
          </Typography>
        </Container>
      </Box>
    </main>
  );
}
export default Error;
