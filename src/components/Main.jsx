import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useCookies } from "react-cookie";
import { cookieUser } from "../config";
import React, { Suspense, useState } from "react";
import Nav from "./Navbar/Navbar";
import { Alert, Snackbar } from "@mui/material";
import axios from "axios";
const Home = React.lazy(() => import("./Home"));
const Clubs = React.lazy(() => import("./Clubs/Clubs"));
const Parts = React.lazy(() => import("./Partners/Partners"));
const Events = React.lazy(() => import("./Events/Events"));
const Prev = React.lazy(() => import("./Prev"));
const Error = React.lazy(() => import("./Error"));
const Signin = React.lazy(() => import("./Auth/SignIn"));
const Signup = React.lazy(() => import("./Auth/SignUp"));
const Admin = React.lazy(() => import("./AdminPanel/AdminPanel"));

const defaultSnackbarState = { open: false, severity: "info", message: "" };
const defaultUserSate = {
  id: null,
  name: null,
  mail: null,
  role: null,
  token: null,
};

function Main() {
  const [user, setUser] = useState({});
  const [snackbarState, setSnackbarState] =
    React.useState(defaultSnackbarState);
  const [cookies, setCookie, removeCookie] = useCookies([cookieUser]);

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") return;
    else setSnackbarState(defaultSnackbarState);
  };

  React.useEffect(() => {
    setUser(cookies[cookieUser] ?? defaultUserSate);
    axios.defaults.headers.common["Authorization"] = `Bearer ${
      (cookies[cookieUser] ?? {}).token
    }`;
  }, [cookies]);

  return (
    <Router>
      <Nav
        loggedUser={user}
        setUser={setUser}
        setSnackbarState={setSnackbarState}
      />
      <Suspense fallback="Loading...">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/clubs" element={<Clubs />} />
          <Route exact path="/parts" element={<Parts />} />
          <Route exact path="/events" element={<Events />} />
          <Route exact path="/prev" element={<Prev />} />
          <Route
            exact
            path={user.id ? "/" : "/signin"}
            element={
              <Signin setSnackbarState={setSnackbarState} setUser={setUser} />
            }
          />
          <Route
            exact
            path="/signup"
            element={
              <Signup
                user={user}
                setUser={setUser}
                setSnackbarState={setSnackbarState}
              />
            }
          />
          <Route
            exact
            path={user && user.role === "admin" ? "/admin" : "/"}
            element={<Admin setSnackbarState={setSnackbarState} />}
          />
          <Route path="*" element={<Error />} />
        </Routes>
      </Suspense>
      <Snackbar
        open={snackbarState.open}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarState.severity}>
          {snackbarState.message}
        </Alert>
      </Snackbar>
    </Router>
  );
}

export default Main;
