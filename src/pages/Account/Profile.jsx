import React from "react";
import Layout from "../Layout";
import { Typography, useTheme, Grid, Avatar } from "@mui/material";
import { useAuthState } from "../../contexts/AuthContext"; // Assuming user info is stored directly under user key
import ashImage from "../../assets/Ash.png";

const MainContent = () => {
  const theme = useTheme(); // Use the theme
  const { userInfo } = useAuthState(); // Assuming user info is stored directly under user key

  // Dummy data for Pokemon roster (replace with actual data)
  const pokemonRoster = [
    {
      name: "Rayquaza Lv. 5",
      imageUrl: "https://img.pokemondb.net/sprites/home/normal/1x/rayquaza.png",
    },
    {
      name: "Celebi Lv. 10",
      imageUrl: "https://img.pokemondb.net/sprites/home/normal/1x/celebi.png",
    },
    {
      name: "Mew Lv. 15",
      imageUrl: "https://img.pokemondb.net/sprites/home/normal/1x/mew.png",
    },
    {
      name: "Regirock Lv. 5",
      imageUrl: "https://img.pokemondb.net/sprites/home/normal/1x/regirock.png",
    },
    {
      name: "Regice Lv. 10",
      imageUrl: "https://img.pokemondb.net/sprites/home/normal/1x/regice.png",
    },
    {
      name: "Registeel Lv. 15",
      imageUrl:
        "https://img.pokemondb.net/sprites/home/normal/1x/registeel.png",
    },
  ];

  return (
    <>
      {/* User Details */}
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        xs={12}
        md={6}
        sx={{
          m: 2,
          p: 4,
          backgroundColor: "#0F141A",
          borderTop: "3px solid #ea80fc",
          borderRadius: "10px",
          margin: "2rem auto",
        }}
      >
        {" "}
        <Grid
          item
          xs={12}
          md={6}
          sx={{ backgroundColor: "#F5F5F5", borderRadius: "10px" }}
        >
          {/* Avatar (Replace src with actual image URL or dynamic import) */}
          <Avatar
            alt={userInfo?.username || "User"}
            src={ashImage}
            sx={{
              width: theme.spacing(25),
              height: theme.spacing(25),
              margin: "auto",
            }}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            p: 4,
          }}
        >
          <Typography variant="h3" gutterBottom>
            {userInfo?.username || "N/A"}
          </Typography>
          <Typography variant="h6" gutterBottom>
            User ID: #{userInfo?.userId || "N/A"}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Starter: {userInfo?.starterPokemon || "N/A"}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Team: {userInfo?.team || "N/A"}
          </Typography>
        </Grid>
      </Grid>

      {/* Pokemon Roster */}
      <Grid
        container
        sx={{
          m: 2,
          p: 4,
          backgroundColor: "#0F141A",
          borderTop: "3px solid #ea80fc",
          borderRadius: "10px",
          margin: "2rem auto",
        }}
      >
        {pokemonRoster.map((pokemon, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <Grid
              container
              justifyContent="center"
              flexDirection="column"
              sx={{ p: 4 }}
            >
              <Grid item>
                <Avatar
                  alt={pokemon.name}
                  src={pokemon.imageUrl}
                  sx={{
                    width: theme.spacing(12),
                    height: theme.spacing(12),
                    margin: "auto",
                  }}
                />
              </Grid>
              <Typography
                variant="h6"
                align="center"
                sx={{ fontWeight: "700", mt: 2 }}
              >
                {pokemon.name}
              </Typography>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

const Profile = () => {
  return (
    <Layout pageTitle="My Profile">
      <MainContent />
    </Layout>
  );
};

export default Profile;
