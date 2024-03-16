// Pokemon.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Button,
  LinearProgress,
} from "@mui/material";

const Pokemon = ({ pokemonName }) => {
  const [pokemonData, setPokemonData] = useState(null);
  const [healthPercentage, setHealthPercentage] = useState(80);

  const formatMoveName = (moveName) => moveName.replace(/-/g, " ");

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
        );
        const spriteUrl = `https://img.pokemondb.net/sprites/home/normal/${pokemonName.toLowerCase()}.png`;
        setPokemonData({
          name: response.data.name,
          types: response.data.types.map((typeInfo) => typeInfo.type.name),
          moves: response.data.moves.slice(0, 4).map((move) => move.move.name),
          imageUrl: spriteUrl, // URL from Pokémon database
        });
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      }
    };

    fetchPokemonData();
  }, [pokemonName]);

  if (!pokemonData) return <div>Loading...</div>;

  return (
    <Card
      sx={{
        position: "relative",
        maxWidth: "345px",
        margin: "0 auto",
        borderTop: "3px solid #ea80fc",
      }}
    >
      <Box sx={{ position: "absolute", top: 0, right: 0, p: 1 }}>
        {pokemonData.types.map((type, index) => (
          <span key={index} className={`type-icon type-${type.toLowerCase()}`}>
            {type}
          </span>
        ))}
      </Box>
      <CardMedia
        component="img"
        image={pokemonData.imageUrl || ""}
        alt={pokemonName}
        p={3}
        sx={{
          width: 125,
          height: "auto",
          objectFit: "contain",
          margin: "0 auto",
          mt: 2,
        }}
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="h5"
          sx={{ textTransform: "capitalize", pb: 2 }}
        >
          {pokemonData.name}
        </Typography>
        <Grid container spacing={1}>
          {pokemonData.moves.slice(0, 4).map((move, index) => (
            <Grid item xs={6} key={index}>
              <Button variant="outlined" sx={{ width: "100%" }}>
                {formatMoveName(move)}
              </Button>
            </Grid>
          ))}
        </Grid>
      </CardContent>
      <Box sx={{ position: "relative", display: "flex", alignItems: "center" }}>
        <LinearProgress
          variant="determinate"
          value={healthPercentage}
          sx={{
            height: "25px",
            width: "100%",
            boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.2)",
          }}
        />
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            position: "absolute",
            width: "100%",
            textAlign: "center",
            lineHeight: "25px", // This should match the height of your LinearProgress bar
            color: "#fff",
            fontWeight: "700",
          }}
        >
          {healthPercentage}%
        </Typography>
      </Box>
    </Card>
  );
};

export default Pokemon;
