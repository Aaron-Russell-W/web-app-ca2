import React, { useState,useEffect } from "react";
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
import { useAuth } from '../../authHelpers'; 
const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

const SiteHeader = ({ history }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  
  const navigate = useNavigate();

  const menuOptions = [
    { label: "Home", path: "/" },
    { label: "Favourites", path: "/movies/favourites" },
    { label: "Upcoming", path: "/movies/upcoming" },
    { label: "Now Playing", path: "/movies/nowplaying" },
    { label: "Popular Actors", path: "/actors/popular" }
  
  ];

  const handleMenuSelect = (pageURL) => {
    navigate(pageURL, { replace: true });
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const [latestMovie, setLatestMovie] = useState(null);

  // Function to navigate to the movie detail page
  const navigateToMovieDetail = (movieId) => {
    navigate(`/movies/${movieId}`);
  };
  useEffect(() => {
    getLatestMovie()
      .then(data => {
        setLatestMovie(data);
      })
      .catch(error => {
        console.error("Failed to fetch latest movie:", error);
      });
  }, []);
  const { currentUser } = useAuth();
  return (
    <>
      <AppBar position="fixed" color="secondary">
        <Toolbar>
            <Typography variant="h4" sx={{ flexGrow: 1 }}>
              MovieDB
            </Typography>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            All you ever wanted to know about Movies!
          </Typography>
          {currentUser && (
            <Typography variant="h6" color="inherit" sx={{ flexGrow: 0, marginRight: 2 }}>
              Welcome, {currentUser.displayName || 'User'}!
            </Typography>
          )}
          {latestMovie && (
          <Button color="inherit" onClick={() => navigateToMovieDetail(latestMovie.id)}>
            Latest Movie: {latestMovie.title}
          </Button>
        )}
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
                      onClick={() => handleMenuSelect(opt.path)}
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
                    onClick={() => handleMenuSelect(opt.path)}
                  >
                    {opt.label}
                  </Button>
                ))}
              </>
            )}
        </Toolbar>
      </AppBar>
      <Offset />
    </>
  );
};

export default SiteHeader;