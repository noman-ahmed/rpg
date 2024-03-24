// PokeNav.js
import React from "react";
import { Box, Tooltip, Typography } from "@mui/material";

const PokeNav = ({ pokemonData, onPokemonClick, textColor, sx }) => {
  // Add 'sx' here
  return (
    <Box className="pokeNavWrapper" sx={{ ...sx, m: 0, p: 0 }}>
      {" "}
      {/* Now 'sx' is defined */}
      <ul className="pokeNavMenu">
        {pokemonData.map((pokemon, index) => (
          <Tooltip
            key={index}
            title={`${pokemon.name} Lv. ${pokemon.level}`}
            arrow
            placement="top"
          >
            <li
              className="pokeNavItem"
              onClick={() => onPokemonClick(index)}
              style={{
                cursor: "pointer",
                height: "60px",
                width: "60px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <img
                className="pokeNavSprite"
                src={pokemon.sprite}
                alt={pokemon.name}
              />
            </li>
          </Tooltip>
        ))}
      </ul>
    </Box>
  );
};

export default PokeNav;
