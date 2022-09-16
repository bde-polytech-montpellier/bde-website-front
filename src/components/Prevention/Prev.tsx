import * as React from "react";
import {
  Box,
  createTheme,
  CssBaseline,
  ThemeProvider,
  Typography,
  Container,
  Grid,
  Divider,
} from "@mui/material";
import jeanne from "../../static/jeanne.webp";
import lucas from "../../static/lucas.webp";
import morgane from "../../static/morgane.webp";
import manon from "../../static/manon.webp";
import Footer from "../Footer";
import Member from "./Member";

const theme = createTheme();

function Prev() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 4,
            pb: 0,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              {"Espace prévention"}
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              {"Qui que tu sois et quel que soit ton besoin !"}
            </Typography>
          </Container>
        </Box>
        <Container maxWidth="lg">
          <Grid container spacing={2}>
            <Grid item justifyContent={"center"} xs={12} sm={6}>
              <Divider flexItem />
              <Typography
                variant="h4"
                align="center"
                color="text.primary"
                gutterBottom
                mt={1}
              >
                Les Protections
              </Typography>
              <p>
                Que ce soit des préservatifs, des capotes de verre ou des
                protections menstruelles, la team prev’ est là pour toi !{" "}
              </p>
              <p>
                N’hésite pas à nous contacter et nous te ferons passer de quoi
                te protéger. Les capotes de verre sont réutilisables donc une ou
                deux par personne ! Surtout garde-les bien et ramène-les à
                toutes tes soirées.
              </p>
              <p>
                Nous sommes également en train de mettre en place des
                distributeurs de protections périodiques dans les toilettes de
                Polytech, s’ils sont vides ou qu’il y a un quelconque problème
                préviens-nous !
              </p>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Divider flexItem />
              <Typography
                variant="h4"
                align="center"
                color="text.primary"
                gutterBottom
                mt={1}
              >
                Écoute & Aide
              </Typography>
              <p>
                Si vous avez un problème, êtes victime ou avez été victime d’une
                agression, adressez-vous à nous !
              </p>
              <p>
                Nous vous adresserons à la responsable Violences Sexistes et
                Sexuelles (VSS) de Polytech Montpellier. Une personne formée et
                responsable qui pourra mettre en place un conseil afin que vous
                et les autres élèves soyez toujours protégés.
              </p>
              <p>
                Toutefois si vous ne souhaitez pas qu’une autre personne soit au
                courant nous trouverons ensemble une autre solution qui vous
                conviendra.
              </p>
              <p>
                Si votre problème ne concerne pas des VSS nous saurons aussi
                vous écouter et vous diriger vers des professionnels.
              </p>
            </Grid>
            <Grid item xs={12}>
              <Divider flexItem />
              <Typography
                variant="h4"
                align="center"
                color="text.primary"
                gutterBottom
                mt={1}
              >
                Sécurité en évènement
              </Typography>
              Tu n’es pas toujours très à l’aise en évènement Polytech et tu ne
              sais pas comment te sentir plus en sécurité ? La team prev’ est là
              pour ça ! Repère un membre du staff avec un signe distinctif
              (brassard fluo, banane de secours) et adresse-toi à lui. Que tu
              aies un petit ou un gros bobo, un copain qui a trop bu, un
              problème avec une autre personne ou juste besoin de faire une
              pause, on est là pour que tu passes la meilleure soirée possible !
            </Grid>
            <Grid item xs={12}>
              <Divider flexItem />
              <Typography
                variant="h4"
                align="center"
                color="text.primary"
                gutterBottom
                mt={1}
              >
                La Team
              </Typography>
              <Grid container spacing={2} mt={1}>
                <Grid item xs={6} sm={3}>
                  <Member name="Jeanne Barp" img={jeanne} />
                </Grid>
                <Grid item xs={6} sm={3} textAlign="center">
                  <Member name="Manon Ensuque" img={manon} />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Member name="Lucas Moriss" img={lucas} />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Member name="Morgane Paturel" img={morgane} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </main>
      <footer>
        <Footer />
      </footer>
    </ThemeProvider>
  );
}

export default Prev;
