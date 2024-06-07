import React from "react";
import Layout from "../Layout";
import { useTheme, Grid, Avatar, Paper, Typography, Box } from "@mui/material";

const MainContent = () => {
  const theme = useTheme();

  // Dummy data for Pokemon roster (replace with actual data)
  const pokemonRoster = [
    {
      name: "Rayquaza",
      level: "5",
      imageUrl: "https://img.pokemondb.net/sprites/home/normal/1x/rayquaza.png",
    },
    {
      name: "Celebi",
      level: "10",
      imageUrl: "https://img.pokemondb.net/sprites/home/normal/1x/celebi.png",
    },
    {
      name: "Mew",
      level: "15",
      imageUrl: "https://img.pokemondb.net/sprites/home/normal/1x/mew.png",
    },
    {
      name: "Regirock",
      level: "5",
      imageUrl: "https://img.pokemondb.net/sprites/home/normal/1x/regirock.png",
    },
    {
      name: "Regice",
      level: "10",
      imageUrl: "https://img.pokemondb.net/sprites/home/normal/1x/regice.png",
    },
    {
      name: "Registeel",
      level: "15",
      imageUrl:
        "https://img.pokemondb.net/sprites/home/normal/1x/registeel.png",
    },
  ];

  // Extract the central Pokémon
  const centralPokemon = pokemonRoster[2]; // Mew
  const surroundingPokemon = pokemonRoster.filter(
    (pokemon) => pokemon !== centralPokemon
  );

  return (
    <Box
      sx={{ position: "relative", width: "100%", textAlign: "center", mt: 5 }}
    >
      <Box
        sx={{
          zIndex: 1,
          backgroundColor: theme.palette.background.default,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Avatar
          alt={centralPokemon.name}
          src={centralPokemon.imageUrl}
          sx={{
            width: theme.spacing(8),
            height: theme.spacing(8),
          }}
        />
      </Box>
      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems="center"
        sx={{ mt: theme.spacing(20) }}
      >
        {surroundingPokemon.map((pokemon, index) => (
          <Grid item xs={12} sm={2} key={index}>
            <Paper
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: theme.palette.background.paper,
                color: theme.palette.text.primary,
                padding: theme.spacing(2),
                textAlign: "center",
                height: theme.spacing(30), // Increase the height by 200px (original height + 200px)
              }}
            >
              <Avatar
                alt={pokemon.name}
                src={pokemon.imageUrl}
                sx={{
                  width: theme.spacing(8),
                  height: theme.spacing(8),
                  margin: "0 auto",
                }}
              />
              <Typography variant="p" component="div">
                {pokemon.name}
              </Typography>
              <Typography>Lv. {pokemon.level}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

function TeamRoster() {
  return (
    <Layout pageTitle="Team Roster">
      <MainContent />
    </Layout>
  );
}

export default TeamRoster;
