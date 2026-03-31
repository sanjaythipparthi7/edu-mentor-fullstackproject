import React from "react";
import { Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";

const DashboardNav = () => (
  <Stack direction="row" spacing={2} sx={{ marginBottom: 3 }}>
    <Button component={Link} to="/dashboard" variant="outlined">
      Home
    </Button>
    <Button component={Link} to="/dashboard/courses" variant="outlined">
      Courses
    </Button>
    <Button component={Link} to="/dashboard/assignments" variant="outlined">
      Assignments
    </Button>
  </Stack>
);

export default DashboardNav;
