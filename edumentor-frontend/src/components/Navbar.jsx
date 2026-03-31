import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button, Box, Menu, MenuItem } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";

function Navbar() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <AppBar position="sticky" color="primary" elevation={2}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>

        {/* Logo */}
        <Typography variant="h5" fontWeight="bold">
          EduMentor
        </Typography>

        {/* Links */}
        <Box display="flex" gap={3} alignItems="center">
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/about">About</Button>
          <Button color="inherit" component={Link} to="/contact">Contact</Button>
          <Button color="inherit" component={Link} to="/admissions">Admissions</Button>
          <Button color="inherit" component={Link} to="/schools">Schools</Button>
          <Button color="inherit" component={Link} to="/exams">Exams</Button>
          <Button color="inherit" component={Link} to="/placements">Placements</Button>

          {/* If user NOT logged in → Show Login/Register */}
          {!user && (
            <>
              <Button color="inherit" component={Link} to="/login">Login</Button>

              <Button
                variant="contained"
                color="secondary"
                component={Link}
                to="/register"
              >
                Register
              </Button>
            </>
          )}

          {/* If user logged in → Show Profile Dropdown */}
          {user && (
            <>
              <Button
                color="inherit"
                onClick={handleMenu}
                sx={{
                  backgroundColor: "#1565c0",
                  padding: "6px 15px",
                  borderRadius: "6px",
                  color: "white",
                  textTransform: "none",
                  fontWeight: "bold",
                }}
              >
                {user.name} ▼
              </Button>

              <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                <MenuItem disabled>
                  <strong>{user.name}</strong>
                </MenuItem>
                <MenuItem disabled style={{ color: "gray" }}>
                  Role: {user.role}
                </MenuItem>
                <MenuItem onClick={() => navigate("/profile")}>Profile</MenuItem>
                <MenuItem
                  onClick={() =>
                    navigate(`/dashboard/${user.role.toLowerCase()}`)
                  }
                >
                  Dashboard
                </MenuItem>
                <MenuItem onClick={handleLogout} sx={{ color: "red" }}>
                  Logout
                </MenuItem>
              </Menu>
            </>
          )}

        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
