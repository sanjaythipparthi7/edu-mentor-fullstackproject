import React from "react";
import { Box, Typography, Grid, Link } from "@mui/material";

function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: "#1E1E2F",
        color: "white",
        padding: "40px 20px",
        marginTop: "50px",
      }}
    >
      <Grid container spacing={4}>
        
        {/* Logo Section */}
        <Grid item xs={12} md={3}>
          <Typography variant="h5" fontWeight="bold" mb={1}>
            EduMentor
          </Typography>
          <Typography variant="body2" color="#cccccc">
            Empowering students, teachers, and administrators with modern
            digital learning tools.
          </Typography>
        </Grid>

        {/* Important Links */}
        <Grid item xs={12} md={3}>
          <Typography variant="h6" fontWeight="bold" mb={1}>
            Quick Links
          </Typography>
          <Link href="/about" color="#cccccc" underline="hover" display="block">
            About Us
          </Link>
          <Link href="/contact" color="#cccccc" underline="hover" display="block">
            Contact
          </Link>
          <Link href="/admissions" color="#cccccc" underline="hover" display="block">
            Admissions
          </Link>
          <Link href="/placements" color="#cccccc" underline="hover" display="block">
            Placements
          </Link>
        </Grid>

        {/* User Links */}
        <Grid item xs={12} md={3}>
          <Typography variant="h6" fontWeight="bold" mb={1}>
            Users
          </Typography>
          <Link href="/login" color="#cccccc" underline="hover" display="block">
            Login
          </Link>
          <Link href="/register" color="#cccccc" underline="hover" display="block">
            Register
          </Link>
          <Link href="/dashboard" color="#cccccc" underline="hover" display="block">
            Dashboard
          </Link>
        </Grid>

        {/* Contact Info */}
        <Grid item xs={12} md={3}>
          <Typography variant="h6" fontWeight="bold" mb={1}>
            Contact Us
          </Typography>
          <Typography variant="body2" color="#cccccc">
            📧 support@edumentor.com
          </Typography>
          <Typography variant="body2" color="#cccccc">
            📞 +91 98765 43210
          </Typography>
          <Typography variant="body2" color="#cccccc">
            📍 Hyderabad, India
          </Typography>
        </Grid>
      </Grid>

      {/* Bottom */}
      <Typography
        variant="body2"
        textAlign="center"
        mt={4}
        color="#888888"
      >
        © {new Date().getFullYear()} EduMentor. All Rights Reserved.
      </Typography>
    </Box>
  );
}

export default Footer;
