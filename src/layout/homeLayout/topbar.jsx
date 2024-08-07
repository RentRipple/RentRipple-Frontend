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
import { Link, NavLink, useNavigate } from "react-router-dom";
import Logo from "../../component/logo";
import profile from "../../assets/profile.svg";
import { AppContext } from "../../context/AppContext";
import { indigo } from "@mui/material/colors";

const headersData = [
  {
    label: "Explore",
    href: "/",
  },
  {
    label: "Add Property",
    href: "/add-property",
    protected: true,
  },
  {
    label: "Chats",
    href: "/chat",
    protected: true,
  },
];

const ToolbarStyled = styled(Toolbar)(() => ({
  backgroundColor: "#E7EDF2",
  border: "none",
  marginBottom: "32px",
  padding: "5px",
}));

const DrawerContainer = styled("div")({
  padding: "20px",
  width: "250px",
});

const DrawerIcon = styled(IconButton)({
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
  transition: "transform 0.3s",
  "&:hover": {
    cursor: "pointer",
    transform: "scale(1.1)",
  },
});

function Header() {
  const { name, isLogin, handleLogout } = useContext(AppContext);
  const navigate = useNavigate();
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
    return (
      name.split(" ")[0].charAt(0) + name.split(" ")[1].charAt(0)
    ).toUpperCase();
  };

  const handleDrawerOpen = () =>
    setState((prevState) => ({ ...prevState, drawerOpen: true }));
  const handleDrawerClose = () =>
    setState((prevState) => ({ ...prevState, drawerOpen: false }));

  const handleNavigation = (href, protectedRoute) => {
    if (protectedRoute && !isLogin) {
      navigate("/login");
    } else {
      navigate(href);
    }
  };

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
                <Avatar sx={{ width: 40, height: 40, bgcolor: indigo[200] }}>
                  {getInitials()}
                </Avatar>
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
              <MenuItem onClick={() => navigate("/profile")}>Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </>
        ) : (
          <Button
            variant="contained"
            size="large"
            to="/login"
            component={Link}
            style={{
              marginLeft: "15px",
              whiteSpace: "pre",
              backgroundColor: "#22538d",
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
              <>
                <IconButton
                  aria-label="delete"
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  style={{ marginLeft: "10px" }}
                  size="large"
                >
                  <Avatar onClick={() => navigate("/profile")}
                    style={{ marginBottom: "10px", width: "80px", height: "80px", backgroundColor: indigo[200] }}>
                  {getInitials()}
                </Avatar>
                </IconButton>
                {getDrawerChoices()} <br />
                <Button
                  variant="contained"
                  size="large"
                  color="primary"
                  component={Link}
                  style={{
                    marginLeft: "15px",
                    whiteSpace: "pre",
                    backgroundColor: "rgb(34, 83, 141)",
                  }}
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
              <IconButton
                  aria-label="delete"
                  aria-controls="simple-menu"
                  aria-haspopup="true"
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
              {getDrawerChoices()}<br />
              <Button
                variant="contained"
                size="large"
                color="primary"
                to="/login"
                component={Link}
                style={{
                  marginLeft: "15px",
                  whiteSpace: "pre",
                  backgroundColor: "rgb(34, 83, 141)",
                }}
              >
                Login
              </Button>
              </>
            )}
           
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
    headersData.map(({ label, href, protected: protectedRoute }) => (
      <MenuButton
        key={label}
        color="inherit"
        onClick={() => handleNavigation(href, protectedRoute)}
      >
        <MenuButtonMobile >{label}</MenuButtonMobile>
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
    headersData.map(({ label, href, protected: protectedRoute }) => (
      <NavLink
        exact
        key={label}
        color="inherit"
        onClick={(e) => {
          e.preventDefault();
          handleNavigation(href, protectedRoute);
        }}
        to={href}
        className="menuButton"
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
