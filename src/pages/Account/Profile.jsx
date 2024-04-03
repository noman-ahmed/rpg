import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import { Typography, useTheme } from "@mui/material";
import { useSelector } from "react-redux"; // Import useSelector

const MainContent = () => {
  const theme = useTheme(); // Use the theme

  // Use useSelector to access the user info from the auth slice
  const user = useSelector((state) => state.auth.user);

  return (
    <>
      <Typography variant="h3" gutterBottom color="textPrimary">
        Username: {user?.username || "N/A"}
      </Typography>
      <Typography variant="h5" gutterBottom color="textPrimary">
        User ID: {user?.userId || "N/A"}
      </Typography>
      <Typography variant="h5" gutterBottom color="textPrimary">
        Starter: {user?.starterPokemon || "N/A"}
      </Typography>
      <Typography variant="h5" gutterBottom color="textPrimary">
        Team: {user?.team || "N/A"}
      </Typography>
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
