import * as React from "react";
import { cookieToken } from "../../config";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  InputBase,
  MenuItem,
  Stack,
} from "@mui/material";
import { AccountCircle, Face, Search } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import logobde from "../../static/logo.webp";
import { styled, alpha } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import "../../style/Nav.css";
import { NavbarParams } from "../../models/index";

export default function ResponsiveAppBar(params: NavbarParams) {
  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = React.useState<Element | undefined>(
    undefined,
  );
  const [anchorElUser, setAnchorElUser] = React.useState<Element | undefined>(
    undefined,
  );

  const pages = [
    { name: "Clubs", link: "/clubs" },
    { name: "Partenariats", link: "/parts" },
    { name: "Prévention", link: "/prev" },
    { name: "Events", link: "/events" },
    { name: "Goodies", link: "/goodies" },
  ];

  const handleDisconnect = () => {
    params.setUser({});
    params.removeCookie(cookieToken);
    params.setSnackbarState({
      open: true,
      severity: "success",
      message: "Deconnexion réussie",
    });
    navigate("/");
  };

  const Disconnect = () => {
    return (
      <MenuItem onClick={handleDisconnect}>
        <Typography textAlign={"center"}>Logout</Typography>
      </MenuItem>
    );
  };

  const AuthSettings = () => {
    if (params.loggedUser.role) {
      if (params.loggedUser.role === "admin")
        return (
          <Stack>
            <Link to={"/admin"}>
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center">Admin Panel</Typography>
              </MenuItem>
            </Link>
            <Link to={"/signup"}>
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center">Modifier mes infos</Typography>
              </MenuItem>
            </Link>
            <Disconnect />
          </Stack>
        );
      else
        return (
          <Stack>
            <Link to={"/signup"}>
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center">Modifier mes infos</Typography>
              </MenuItem>
            </Link>
            <Disconnect />
          </Stack>
        );
    } else {
      return (
        <Stack>
          <Link to={"/signin"}>
            <MenuItem onClick={handleCloseUserMenu}>
              <Typography textAlign="center">Signin</Typography>
            </MenuItem>
          </Link>
          <Link to={"/signup"}>
            <MenuItem onClick={handleCloseUserMenu}>
              <Typography textAlign="center">Signup</Typography>
            </MenuItem>
          </Link>
        </Stack>
      );
    }
  };

  const SearchBar = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  }));

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(undefined);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(undefined);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters id="back-to-top-anchor">
          <Link to="/">
            <Avatar
              alt="Logo bde"
              src={logobde}
              sx={{
                display: { xs: "none", md: "flex" },
                mr: 1,
                width: 54,
                height: 54,
              }}
            />
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="menu appbar"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map(({ name, link }) => (
                <Link key={name} to={link}>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{name}</Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>
          <Link to="/">
            <Avatar
              alt="Logo bde"
              src={logobde}
              sx={{
                display: { xs: "flex", md: "none" },
                ml: 1,
                width: 40,
                height: 40,
              }}
            />
          </Link>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          ></Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map(({ name, link }) => (
              <Link key={name} to={link}>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {name}
                </Button>
              </Link>
            ))}
          </Box>

          {/* <SearchBar sx={{ mr: 2 }}>
            <SearchIconWrapper>
              <Search />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="WIP Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </SearchBar> */}

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="primary-search-account-menu"
                aria-haspopup="true"
                color="inherit"
                onClick={handleOpenUserMenu}
                sx={{ p: 0 }}
              >
                {params.loggedUser.role ? (
                  <Face sx={{ width: 40, height: 40 }} />
                ) : (
                  <AccountCircle sx={{ width: 40, height: 40 }} />
                )}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <AuthSettings />
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
