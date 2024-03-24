import React from "react";
import Layout from "../Layout"; // Adjust the path as necessary
import { Typography, useTheme } from "@mui/material";

const MainContent = () => {
  const theme = useTheme(); // Use the theme

  return (
    <>
      <Typography variant="h3" gutterBottom color="textPrimary"></Typography>
    </>
  );
};

function Profile() {
  return (
    <Layout pageTitle="My Profile">
      <MainContent />
    </Layout>
  );
}

export default Profile;
