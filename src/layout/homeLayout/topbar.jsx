import PropTypes from "prop-types";
import {
  AppBar,
  Toolbar,
  Grid,
  Box,
  Drawer,
  IconButton,
  Button,
  MenuItem,
  Tooltip,
  Avatar,
  Menu,
} from "@mui/material";
import { styled } from "@mui/system";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useState, useEffect, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import Logo from "../../component/logo";
import profile from "../../assets/profile.svg";
import { AppContext } from "../../context/AppContext";

const headersData = [
  {
    label: "Explore",
    href: "/",
  },
  {
    label: "Chats",
    href: "/#",
  },
];

const ToolbarStyled = styled(Toolbar)(() => ({
  backgroundColor: "transparent",
  border: "none",
}));

const DrawerContainer = styled("div")({
  padding: "20px",
  width: "250px",
});

const DrawerIcon = styled(IconButton)({
  // color: "black",
  fontSize: "30px",
  padding: "10px",
});

const MenuButton = styled(Button)({
  color: "inherit",
  textDecoration: "none",
  margin: "0 10px",
});

const MenuButtonMobile = styled(MenuItem)({
  textAlign: "center",
  width: "100%",
});

const LogoBox = styled(Box)({
  display: "flex",
  alignItems: "center",
});

function Header() {
  const { name, isLogin, handleLogout } = useContext(AppContext);

  const [anchorEl, setAnchorEl] = useState(null);

  const [state, setState] = useState({
    mobileView: false,
    drawerOpen: false,
  });

  const { mobileView, drawerOpen } = state;


  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 1220
        ? setState((prevState) => ({ ...prevState, mobileView: true }))
        : setState((prevState) => ({ ...prevState, mobileView: false }));
    };

    setResponsiveness();
    window.addEventListener("resize", setResponsiveness);

    return () => window.removeEventListener("resize", setResponsiveness);
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getInitials = () => {
    return (name.split(" ")[0].charAt(0) + name.split(" ")[1].charAt(0)).toUpperCase()
  }

  const handleDrawerOpen = () =>
    setState((prevState) => ({ ...prevState, drawerOpen: true }));
  const handleDrawerClose = () =>
    setState((prevState) => ({ ...prevState, drawerOpen: false }));

  const displayDesktop = () => (
    <ToolbarStyled>
      <Grid container alignItems="center">
        <Grid item xs={1}>
          {femmecubatorLogo}
        </Grid>
        <Grid item xs={8} align="left">
          {getMenuButtons()}
        </Grid>
      </Grid>
      <div style={{ display: "flex", flexDirection: "row" }}>
        {/* User profile and menu */}
        {isLogin ? (
          <>
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleClick}
                size="medium"
                sx={{ ml: 2 }}
                aria-controls={anchorEl ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={anchorEl ? "true" : undefined}
              >
                <Avatar sx={{ width: 40, height: 40 }}>{getInitials()}</Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={Boolean(anchorEl)}
              onClose={handleClose}
              onClick={handleClose}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </>
        ) : (
          <Button
            variant="contained"
            size="large"
            color="primary"
            to="/login"
            component={Link}
            style={{
              marginLeft: "15px",
              whiteSpace: "pre",
              backgroundColor: "#1569C1",
            }}
          >
            Login
          </Button>
        )}
      </div>
    </ToolbarStyled>
  );

  const displayMobile = () => (
    <ToolbarStyled>
      <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerClose}>
        <DrawerContainer>
          <center>
            {isLogin ? (
              <div style={{ display: "flex", flexDirection: "column" }}>
                <IconButton
                  aria-label="delete"
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  //   onClick={}
                  style={{ marginLeft: "10px" }}
                  size="small"
                >
                  <img
                    src={profile}
                    alt="Profile Image"
                    width={100}
                    style={{ marginBottom: "10px" }}
                  />
                </IconButton>
                <Button
                  variant="contained"
                  size="large"
                  color="primary"
                  component={Link}
                  style={{
                    marginLeft: "15px",
                    whiteSpace: "pre",
                    backgroundColor: "#1569C1",
                  }}
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Button
                variant="contained"
                size="large"
                color="primary"
                to="/login"
                component={Link}
                style={{
                  marginLeft: "15px",
                  whiteSpace: "pre",
                  backgroundColor: "#1569C1",
                }}
              >
                Login
              </Button>
            )}
            {getDrawerChoices()}
          </center>
        </DrawerContainer>
      </Drawer>

      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
          <LogoBox>{femmecubatorLogo}</LogoBox>
        </Grid>
        <Grid item>
          <DrawerIcon
            edge="start"
            color="black"
            aria-label="menu"
            aria-haspopup="true"
            onClick={handleDrawerOpen}
          >
            <MenuIcon />
          </DrawerIcon>
        </Grid>
      </Grid>
    </ToolbarStyled>
  );

  const getDrawerChoices = () =>
    headersData.map(({ label, href }) => (
      <MenuButton key={label} color="inherit" to={href} component={Link}>
        <MenuButtonMobile>{label}</MenuButtonMobile>
      </MenuButton>
    ));

  const femmecubatorLogo = (
    <LogoBox>
      <Link to="/">
        <Logo className="logoImg" />
      </Link>
    </LogoBox>
  );

  const getMenuButtons = () =>
    headersData.map(({ label, href }) => (
      <NavLink
        exact
        key={label}
        color="inherit"
        to={href}
        className="menuButton"
        activeClassName="active"
        style={{
          padding: "25px",
          textDecoration: "none",
          color: "#333",
          fontFamily: "Roboto",
        }}
      >
        {label}
      </NavLink>
    ));

  return (
    <>
      <AppBar
        position="relative"
        elevation={0}
        style={{
          backgroundColor: "transparent",
          border: "none",
        }}
      >
        {mobileView ? displayMobile() : displayDesktop()}
      </AppBar>
    </>
  );
}

Header.propTypes = {
  children: PropTypes.node,
};

export default Header;
