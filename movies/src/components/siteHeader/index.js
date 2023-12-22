import React, { useState, useEffect, useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useNavigate } from "react-router-dom";
import { styled } from '@mui/material/styles';
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { getLatestMovie } from "../../api/tmdb-api";
import { AuthContext } from "../../contexts/authContext";
const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

const SiteHeader = ({ history }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { isAuthenticated, signout } = useContext(AuthContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

  let menuOptions = [
    { label: "Home", path: "/home" },
    { label: "Favourites", path: "/movies/favourites" },
    { label: "Upcoming", path: "/movies/upcoming" },
    { label: "Now Playing", path: "/movies/nowplaying" },
    { label: "Popular Actors", path: "/actors/popular" }
  ];

  if (isAuthenticated) {
    menuOptions.push({ label: "Logout", path: "/", action: signout });
  } else {
    menuOptions.push({ label: "Login", path: "/login" });
    menuOptions.push({ label: "Sign Up", path: "/signup" });
  }

  const handleMenuSelect = (option) => {
    if (option.action) {
      option.action(); // Call the action if it exists (for Logout)
    } else {
      navigate(option.path, { replace: true });
    }
    setAnchorEl(null); // Close the menu
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const [latestMovie, setLatestMovie] = useState(null);

  useEffect(() => {
    getLatestMovie()
      .then(data => {
        setLatestMovie(data);
      })
      .catch(error => {
        console.error("Failed to fetch latest movie:", error);
      });
  }, []);

  return (
    <>
      <AppBar position="fixed" color="secondary">
        <Toolbar>
          <Typography variant="h4" sx={{ flexGrow: 1 }}>
            MovieDB
          </Typography>
          {isMobile ? (
            <>
              <IconButton
                aria-label="menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={() => setAnchorEl(null)}
              >
                {menuOptions.map((opt) => (
                  <MenuItem
                    key={opt.label}
                    onClick={() => handleMenuSelect(opt)}
                  >
                    {opt.label}
                  </MenuItem>
                ))}
              </Menu>
            </>
          ) : (
            <>
              {menuOptions.map((opt) => (
                <Button
                  key={opt.label}
                  color="inherit"
                  onClick={() => handleMenuSelect(opt)}
                >
                  {opt.label}
                </Button>
              ))}
            </>
          )}
          {latestMovie && (
            <Button color="inherit" onClick={() => navigate(`/movies/${latestMovie.id}`)}>
              Latest Movie: {latestMovie.title}
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Offset />
    </>
  );
};

export default SiteHeader;
