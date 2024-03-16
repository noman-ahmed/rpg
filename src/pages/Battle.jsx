import React, { useState, useEffect, useCallback } from "react";
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
import placeholderImage from "../assets/pikachu.png"; // Add your placeholder image path here

// Theme for the MUI components
const theme = createTheme({
  palette: {
    primary: {
      main: "#ea80fc",
    },
  },
});

const Battle = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedPokemon1, setSelectedPokemon1] = useState("");
  const [selectedPokemon2, setSelectedPokemon2] = useState("");

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
        setter(value.toLowerCase());
      }
    },
    []
  );

  const NoPokemonSelectedCard = () => (
    <Card
      sx={{
        maxWidth: "345px", // Match the width of Pokemon card
        margin: "auto",
        display: "flex",
        flexDirection: "column", // Set the direction of content to column as the Pokemon card might be
        alignItems: "center", // Align items to center
        justifyContent: "space-between", // Distribute space evenly
        height: "100%", // Set the height to match the Pokemon card
      }}
    >
      <CardMedia
        component="img"
        image={placeholderImage} // Ensure you have a placeholder image in your project
        alt="No Pokemon Selected"
        sx={{
          // Adjust the size and display of the placeholder image
          width: "auto", // Set width to auto to maintain aspect ratio
          height: 100, // Set a fixed height similar to Pokemon image
          padding: 2, // Add some padding around the image
        }}
      />
      <CardContent
        sx={{
          flexGrow: 1, // Allow the content to grow if needed
          display: "flex", // Use flex layout for the content
          flexDirection: "column", // Set the direction of content to column
          alignItems: "center", // Center align the content
          justifyContent: "center", // Center content vertically
        }}
      >
        <Typography gutterBottom variant="h5" component="div">
          No Pokemon Selected
        </Typography>
      </CardContent>
    </Card>
  );

  return (
    <ThemeProvider theme={theme}>
      <Box className={`${styles.BoxTheme} wrapper`} component="main">
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          spacing={2}
          sx={{ width: "100%", maxWidth: 1200 }}
        >
          <Grid item xs={12}>
            <Typography variant="h3" sx={{ mb: 4, textAlign: "center" }}>
              Battle
            </Typography>
          </Grid>
          <Grid item xs={5} sx={{ textAlign: "center" }}>
            <Autocomplete
              value={selectedPokemon1}
              onChange={handleChange(setSelectedPokemon1)}
              onInputChange={handleChange(setSelectedPokemon1)} // Detect changes in the input field
              options={pokemonList}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Pokémon 1"
                  variant="standard"
                  sx={{ maxWidth: "auto", mb: 8 }}
                />
              )}
            />
            {selectedPokemon1 ? (
              <Pokemon pokemonName={selectedPokemon1} />
            ) : (
              <NoPokemonSelectedCard />
            )}
          </Grid>
          <Grid item>
            <Typography variant="h4" sx={{ mt: 12 }}>
              vs.
            </Typography>
          </Grid>
          <Grid item xs={5} sx={{ textAlign: "center" }}>
            <Autocomplete
              value={selectedPokemon2}
              onChange={handleChange(setSelectedPokemon2)}
              onInputChange={handleChange(setSelectedPokemon2)} // Detect changes in the input field
              options={pokemonList}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Pokémon 2"
                  variant="standard"
                  sx={{
                    maxWidth: "345px",
                    mb: 8,
                  }}
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
      </Box>
    </ThemeProvider>
  );
};

export default Battle;
