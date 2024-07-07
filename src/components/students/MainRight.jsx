import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { styled, useTheme } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Tooltip from "@mui/material/Tooltip";
import logo from "../../assets/images/logo-home-Djb_K2V0.png";
import { Link } from "react-router-dom";
import { MdAccountCircle } from "react-icons/md";
import { IoHomeOutline } from "react-icons/io5";
import { AiFillFileText } from "react-icons/ai";
import { MdUpcoming } from "react-icons/md";
import { MdPictureAsPdf } from "react-icons/md";
import { MdOutlineSupportAgent } from "react-icons/md";
import { MdLiveHelp } from "react-icons/md";
import { DataContext } from "../../contexts/DataContext";

const drawerWidth = 250;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowX: "hidden"
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`
  }
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar
}));

const DrawerClose = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open"
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme)
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme)
  })
}));

const menuItems = [
  { text: "Home", icon: <IoHomeOutline />, link: "/homepage" },
  { text: "Assignments", icon: <AiFillFileText />, link: "/assignments" },
  { text: "Upcoming slots", icon: <MdUpcoming />, link: "/upcoming-slots" },
  {
    text: "Read user guide",
    icon: <MdPictureAsPdf />,
    link: "https://drive.google.com/uc?export=view&id=1Z2AL5snwR--kUPE6YFddw9pv9UxZ93K2",
    external: true
  },
  {
    text: "Contact Support",
    icon: <MdOutlineSupportAgent />,
    link: "/contact-support"
  },
  { text: "Frequently Asked Question", icon: <MdLiveHelp />, link: "/faq" }
];

export default function MainRight() {
  const { account } = React.useContext(DataContext);
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const getAccount = JSON.parse(localStorage.getItem("Account"));

  const handleDrawerToggle = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen((prevOpen) => !prevOpen);
    }, 1000);
  };

  const accountName =
    account.find((name) => name.id === getAccount?.id)?.name ||
    "No Account Found";

  const handleLogout = () => {
    localStorage.removeItem("Account");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer variant="permanent" open={open}>
        <div
          className="text-center my-2"
          style={{
            padding: open ? "16px" : "8px",
            transition: theme.transitions.create("padding", {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen
            })
          }}
        >
          <Link>
            <img
              src={logo}
              alt="FPT University"
              style={{
                width: open ? "100%" : "150%",
                transition: theme.transitions.create("width", {
                  easing: theme.transitions.easing.sharp,
                  duration: theme.transitions.duration.leavingScreen
                })
              }}
            />
          </Link>
        </div>
        <Link
          style={{
            backgroundColor: "rgb(226, 224, 219)",
            display: "block",
            padding: "16px",
            textAlign: "center",
            margin: "16px 0",
            textDecoration: "none",
            color: "inherit"
          }}
          className="ps-menu-button"
          tabIndex="0"
          to="/login"
          onClick={handleLogout}
        >
          <div className="flex flex-col items-center justify-center text-center">
            <MdAccountCircle size={30} />
            <p style={{ fontSize: "15px", display: open ? "block" : "none" }}>
              {accountName}
            </p>
          </div>
        </Link>
        {open ? (
          <DrawerHeader>
            <IconButton onClick={handleDrawerToggle}>
              <MenuIcon />
            </IconButton>
          </DrawerHeader>
        ) : (
          <DrawerClose>
            <IconButton onClick={handleDrawerToggle}>
              <MenuIcon />
            </IconButton>
          </DrawerClose>
        )}
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding sx={{ display: "block" }}>
              <Tooltip title={item.text} placement="right" arrow>
                <ListItemButton
                  component={Link}
                  to={item.link}
                  target={item.external ? "_blank" : "_self"}
                  rel={item.external ? "noreferrer" : ""}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    color: "inherit"
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                      color: "inherit"
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    sx={{
                      opacity: open ? 1 : 0,
                      color: "inherit"
                    }}
                  />
                </ListItemButton>
              </Tooltip>
            </ListItem>
          ))}
        </List>
      </Drawer>
      {loading && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.2)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
}
