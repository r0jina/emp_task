import {
  AppBar,
  Box,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  Menu,
  MenuItem,
  ThemeProvider,
} from "@mui/material";
import {
  ArrowLeft,
  Bell,
  CaretDown,
  Circle,
  SignOut,
  User,
} from "phosphor-react";
import React from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { drawerData } from "./Drawer";
import "../css/App.css";
import { breakpointsTheme } from "./BreakpointsTheme";
// import removeToken from "../useToken";

const Layout = () => {
  let navigate = useNavigate();
  let location = useLocation();
  const path = location.pathname;
  const [text, setText] = useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleArrowLeft = () => {
    window.history.back();
  };

  const handleClose = () => {
    setAnchorEl(!anchorEl);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <ThemeProvider theme={breakpointsTheme}>
      <Grid container width="100vw" height="100vh" overflow="hidden">
        {/* sidebar */}
        <Grid
          item
          display={{ xs: "none", md: "flex" }}
          flexDirection="column"
          backgroundColor="#dcdceb"
          // className="bg-success"
          padding="32px"
          height={"100vh"}
          overflow="hidden"
          md={2.5}
        >
          <Box
            marginBottom="10px"
            alignItems="center"
            display="flex"
            justifyContent="space-between"
          >
            {/* {theme === "light-theme" ? (
                  <img
                    src={logo}
                    alt=""
                    onClick={() => navigate("/dashboard")}
                  />
                ) : (
                  <img
                    src={logodark}
                    alt=""
                    onClick={() => navigate("/dashboard")}
                  />
                )} */}
            <p className="f3 w2">EMS</p>
          </Box>

          <List>
            {drawerData.map((item, i) => (
              <ListItem
                key={i}
                className={`cursor-pointer
                   ${path === item.path ? "f1 w2" : "f1 w1"}`}
                label={`${item.name}`}
                onClick={() => navigate(`${item.path}`)}
              >
                <ListItemIcon
                // className={`${
                //   path === item.path ? "dashiconselected" : "dashicons"
                // }`}
                >
                  {item.icon}
                </ListItemIcon>
                {item.name}
              </ListItem>
            ))}
          </List>
        </Grid>
        {/* appbar */}
        <Grid item md={9.5}>
          <AppBar
            position="static"
            elevation={0}
            style={{
              height: "74px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              paddingInline: "50px",
              marginTop: "auto",
              marginBottom: "auto",
              alignItems: "center",
            }}
          >
            <div className="f2 w2" style={{ color: "black" }}>
              {text}
            </div>
            <div className="navright">
              <div>
                <Bell size={16} weight="bold" className="bellicon" />
                <Circle
                  size={8}
                  weight="fill"
                  color="#ED4040"
                  className="circleicon"
                />
              </div>
              <div
                className="d-flex flex-direction-row align-items-center"
                style={{ gap: "10px" }}
              >
                <User size={16} weight="bold" />
                <p className="f1 w1 mb-0">User1</p>
              </div>

              <div className="profile ">
                <Menu
                  // style={{ position: "fixed", zIndex: 9999 }}
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem
                    // onClick={handleProfile}
                    className="menulist f1 f c1 w1 menuborder"
                    style={{
                      gap: "10px",
                    }}
                  >
                    <User size={16} />
                    <p className="f0 w1 mb-0">My Profile</p>
                  </MenuItem>
                  <MenuItem
                    //   onClick={handleLogOut}
                    className="menulist f2 f w1"
                    style={{
                      gap: "10px",
                    }}
                    onClick={() => {
                      localStorage.removeItem("token");
                      navigate("/");
                      window.location.reload();
                      // window.location.pathname("/");
                    }}
                  >
                    <SignOut size={16} />
                    <p className="f0 w1 mb-0">Log out</p>
                  </MenuItem>
                </Menu>
                <div
                  className="profilecaretdn"
                  onClick={handleClick}
                  onClose={handleClose}
                >
                  <div className="profileicon">
                    {/* <img src={Ellipse1} alt="" width="100%" /> */}
                  </div>
                  {/* <div className="f2 c1 w1 profiletxt">{name}</div> */}
                  <div className="caretdown ">
                    <CaretDown
                      id="basic-button"
                      aria-controls={open ? "basic-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      onClick={handleClick}
                      weight="bold"
                      size={16}
                    />
                  </div>
                </div>
              </div>
            </div>
          </AppBar>
          <Outlet context={[setText, text]} />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Layout;
