import React, { useState, useEffect, useCallback } from "react";
import Layout from "./Layout";
import {
  Box,
  Grid,
  Autocomplete,
  TextField,
  ThemeProvider,
  Typography,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import { createTheme } from "@mui/material/styles";
import Pokemon from "./Pokemon";
import styles from "../components/layout/layout.module.css";
import placeholderImage from "../assets/pikachu.png"; // Make sure this path is correct

// Theme for the MUI components
const theme = createTheme({
  palette: {
    primary: {
      main: "#ea80fc",
    },
  },
});

const MainContent = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedPokemon1, setSelectedPokemon1] = useState(null);
  const [selectedPokemon2, setSelectedPokemon2] = useState(null);

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=1154"
        );
        const data = await response.json();
        setPokemonList(data.results.map((pokemon) => pokemon.name));
      } catch (error) {
        console.error("Error fetching Pokémon list:", error);
      }
    };

    fetchPokemonList();
  }, []);

  const handleChange = useCallback(
    (setter) => (_, value, reason) => {
      if (reason === "clear") {
        setter(""); // Reset to default if the clear button is clicked
      } else {
        setter(value ? value.toLowerCase() : "");
      }
    },
    []
  );

  const NoPokemonSelectedCard = () => (
    <Card
      sx={{
        maxWidth: "345px",
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        height: "100%",
      }}
    >
      <CardMedia
        component="img"
        image={placeholderImage}
        alt="No Pokemon Selected"
        sx={{
          width: "auto",
          height: 100,
          padding: 2,
        }}
      />
      <CardContent
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography gutterBottom variant="h5" component="div">
          No Pokemon Selected
        </Typography>
      </CardContent>
    </Card>
  );

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      spacing={2}
      sx={{ width: "100%", maxWidth: 1200 }}
    >
      <Grid item xs={12}>
        <Typography variant="h3" sx={{ mb: 4, textAlign: "center", mt: 2 }}>
          Battle
        </Typography>
      </Grid>
      <Grid item xs={12} md={5} sx={{ textAlign: "center" }}>
        <Autocomplete
          value={selectedPokemon1}
          onChange={handleChange(setSelectedPokemon1)}
          options={pokemonList}
          isOptionEqualToValue={(option, value) => option === value}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select Pokémon 1"
              variant="standard"
              sx={{ maxWidth: "345px", mb: 8 }}
            />
          )}
        />
        {selectedPokemon1 ? (
          <Pokemon pokemonName={selectedPokemon1} />
        ) : (
          <NoPokemonSelectedCard />
        )}
      </Grid>
      <Grid item xs={12} md={2} sx={{ textAlign: "center" }}>
        <Typography variant="h4" sx={{ mx: 2, mt: { xs: 2, md: 12 } }}>
          vs.
        </Typography>
      </Grid>
      <Grid item xs={12} md={5} sx={{ textAlign: "center" }}>
        <Autocomplete
          value={selectedPokemon2}
          onChange={handleChange(setSelectedPokemon2)}
          options={pokemonList}
          isOptionEqualToValue={(option, value) => option === value}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select Pokémon 2"
              variant="standard"
              sx={{ maxWidth: "345px", mb: 8 }}
            />
          )}
        />

        {selectedPokemon2 ? (
          <Pokemon pokemonName={selectedPokemon2} />
        ) : (
          <NoPokemonSelectedCard />
        )}
      </Grid>
    </Grid>
  );
};

function Battle() {
  return (
    <Layout>
      <MainContent />
    </Layout>
  );
}

export default Battle;
