import React from "react";
import { Link } from "react-router-dom";

function UnauthorizedPage() {
  return (
    <div style={{ textAlign: "center", marginTop: "80px" }}>
      <h2>403 - Access Denied</h2>
      <p>You don’t have permission to view this page.</p>
      <Link to="/">Go to Home</Link>
    </div>
  );
}

export default UnauthorizedPage;
