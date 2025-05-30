import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router";
import { useUser } from "../contexts/UserContext";

const NavBar = () => {
  const { currentUser, logout } = useUser();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/">Posts</Link>
          </Typography>
          {currentUser && (
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Welcome back {currentUser.name}
            </Typography>
          )}
          <Button color="inherit">
            {currentUser ? (
              <Link to="/register" className="flex gap-3" onClick={logout}>
                Logout
              </Link>
            ) : (
              <Link to="/register" className="flex gap-3">
                <svg
                  width="21"
                  height="20"
                  viewBox="0 0 21 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.5732 2.99646C18.2133 2.99646 18.7393 3.52247 18.7393 4.16248V15.8226C18.7391 16.4625 18.2131 16.9877 17.5732 16.9877H11.4111V16.3226H18.0732V3.66248H11.4111V2.99646H17.5732ZM13.5352 9.99158L10.0781 13.4496L9.61914 12.9906L12.2842 10.3256H3.08203V9.65955H12.2842L9.61816 6.99353L10.0771 6.53455L13.5352 9.99158Z"
                    fill="black"
                    stroke="white"
                  />
                </svg>
                Login
              </Link>
            )}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default NavBar;
