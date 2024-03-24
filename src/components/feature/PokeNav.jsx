// PokeNav.js
import React from "react";
import { Box, Tooltip, Typography } from "@mui/material";

const PokeNav = ({ pokemonData, onPokemonClick, textColor }) => {
  return (
    <Box className="pokeNavWrapper">
      <ul className="pokeNavMenu">
        {pokemonData.map((pokemon, index) => (
          <Tooltip
            key={index}
            title={`${pokemon.name} Lv. ${pokemon.level}`}
            arrow
            placement="top"
          >
            <div>
              <Typography
                variant="body2"
                sx={{
                  textAlign: "center",
                  color: textColor,
                  fontWeight: "700",
                }}
              >
                Slot {index + 1}
              </Typography>
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
            </div>
          </Tooltip>
        ))}
      </ul>
    </Box>
  );
};

export default PokeNav;
