import * as React from "react";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Footer from "../Footer";
import { signup } from "../../routes/roots";
import { cookieToken } from "../../config";
import { getUser } from "../../routes/users-api";
import axios from "axios";
import { SignupParams } from "../../models/user";

const theme = createTheme();

export default function SignUp(params: SignupParams) {
  const defaultValue = {
    firstName: params.user.name ? params.user.name.split(" ")[0] : "",
    lastName: params.user.name ? params.user.name.split(" ")[1] : "",
    mail: params.user.mail ?? "",
    password: "",
    password_repeat: "",
  };
  const [formValues, setFormValues] = React.useState(defaultValue);

  const uMontpellierMail = /^[^\s@]+@(umontpellier.fr|etu.umontpellier.fr)$/;

  const navigate = useNavigate();
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!uMontpellierMail.test(formValues.mail)) {
      params.setSnackbarState({
        open: true,
        severity: "info",
        message: "L'addresse mail doit être celle de l'université",
      });
      return;
    }

    const payload = {
      ...formValues,
      name: formValues.firstName + " " + formValues.lastName,
    };

    (params.user.id
      ? axios.put(getUser(params.user.id), payload).then((reponse) => {
          params.setUser({});
          params.removeCookie(cookieToken);
          params.setSnackbarState({
            open: true,
            severity: "success",
            message: reponse.data.message,
          });
          navigate("/signin");
        })
      : axios.post(signup, payload).then((response) => {
          params.setSnackbarState({
            open: true,
            severity: "success",
            message: response.data.message,
          });
          navigate("/signin");
        })
    ).catch((error) => {
      params.setSnackbarState({
        open: true,
        severity: "error",
        message: error.response.data.message,
      });
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {params.user && params.user.id ? "Update your profile" : "Sign up"}
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  value={formValues.firstName}
                  onChange={handleInputChange}
                  required
                  fullWidth
                  id="firstName"
                  label="Prénom"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  value={formValues.lastName}
                  onChange={handleInputChange}
                  fullWidth
                  id="lastName"
                  label="Nom"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  value={formValues.mail}
                  onChange={handleInputChange}
                  id="mail"
                  label="Mail"
                  name="mail"
                  autoComplete="mail"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  value={formValues.password}
                  onChange={handleInputChange}
                  name="password"
                  label="Mot de passe"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  value={formValues.password_repeat}
                  onChange={handleInputChange}
                  name="password_repeat"
                  label="Confirmer mot de passe"
                  type="password"
                  id="password_repeat"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {params.user && params.user.id ? "Update" : "Sign up"}
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link
                  href={"/signin"}
                  variant="body2"
                  display={params.user.id ? "none" : ""}
                >
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      <Footer />
    </ThemeProvider>
  );
}
