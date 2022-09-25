import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useCookies } from "react-cookie";
import { cookieToken } from "../config";
import React, { Suspense, useState } from "react";
import Nav from "./Navbar/Navbar";
import { Alert, AlertColor, Snackbar } from "@mui/material";
import axios from "axios";
import { User } from "../models/user";
import { SnackbarState } from "../models/index";

const Home = React.lazy(() => import("./Home"));
const Clubs = React.lazy(() => import("./Clubs/Clubs"));
const Parts = React.lazy(() => import("./Partners/Partners"));
const Events = React.lazy(() => import("./Events/Events"));
const Prev = React.lazy(() => import("./Prevention/Prev"));
const Goodies = React.lazy(() => import("./Goodies/Goodies"));
const Error = React.lazy(() => import("./Error"));
const Signin = React.lazy(() => import("./Auth/SignIn"));
const Signup = React.lazy(() => import("./Auth/SignUp"));
const Admin = React.lazy(() => import("./AdminPanel/AdminPanel"));

const defaultSnackbarState = { open: false, severity: "info", message: "" };
const defaultUserSate: User = {
  id: undefined,
  name: undefined,
  mail: undefined,
  role: undefined,
  token: undefined,
};

function Main() {
  const [user, setUser] = useState<User>(defaultUserSate);
  const [snackbarState, setSnackbarState] =
    React.useState<SnackbarState>(defaultSnackbarState);
  const [cookies, setCookie, removeCookie] = useCookies([cookieToken]);

  const handleSnackbarClose = () => {
    setSnackbarState(defaultSnackbarState);
  };

  React.useEffect(() => {
    setUser(cookies[cookieToken] ?? defaultUserSate);
    axios.defaults.headers.common["Authorization"] = `Bearer ${
      (cookies[cookieToken] ?? {}).token
    }`;
  }, [cookies]);

  return (
    <Router>
      <header>
        <Nav
          loggedUser={user}
          setUser={setUser}
          removeCookie={removeCookie}
          setSnackbarState={setSnackbarState}
        />
      </header>
      <Suspense fallback="Loading...">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/clubs" element={<Clubs />} />
          <Route path="/parts" element={<Parts />} />
          <Route path="/events" element={<Events />} />
          <Route path="/prev" element={<Prev />} />
          <Route path="/goodies" element={<Goodies />} />
          <Route
            path={user.id ? "/" : "/signin"}
            element={
              <Signin
                setSnackbarState={setSnackbarState}
                setUser={setUser}
                setCookie={setCookie}
              />
            }
          />
          <Route
            path="/signup"
            element={
              <Signup
                user={user}
                setUser={setUser}
                setSnackbarState={setSnackbarState}
                removeCookie={removeCookie}
              />
            }
          />
          <Route
            path={user && user.role === "admin" ? "/admin" : "/"}
            element={<Admin />}
          />
          <Route path="*" element={<Error />} />
        </Routes>
      </Suspense>
      <Snackbar
        open={snackbarState.open}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarState.severity as AlertColor}
        >
          {snackbarState.message}
        </Alert>
      </Snackbar>
    </Router>
  );
}

export default Main;
