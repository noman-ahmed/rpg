// PokeNav.js
import React, { useState } from "react";
import { Box, Tooltip } from "@mui/material";

const defaultSprite = "src/assets/pokeball.png"; // Ensure this is the correct path relative to your public directory

const PokeNav = ({ pokemonData, onPokemonClick }) => {
  // State to track images that failed to load
  const [erroredImages, setErroredImages] = useState({});

  const handleImageError = (index) => (event) => {
    setErroredImages((prev) => ({ ...prev, [index]: true }));
    event.target.src = defaultSprite;
    event.target.style.width = "25px"; // Default image width
    event.target.style.height = "25px"; // Default image height
  };

  return (
    <Box className="pokeNavWrapper">
      <ul className="pokeNavMenu">
        {pokemonData.map((pokemon, index) => (
          <Tooltip
            key={index}
            title={
              erroredImages[index]
                ? "Empty Pokeball"
                : `${pokemon.name} Lv. ${pokemon.level}`
            }
            arrow
            placement="top"
          >
            <li className="pokeNavItem" onClick={() => onPokemonClick(index)}>
              <img
                className={
                  erroredImages[index]
                    ? "pokeNavSpriteDefault"
                    : "pokeNavSprite"
                }
                src={pokemon.sprite}
                onError={handleImageError(index)}
                alt={
                  erroredImages[index]
                    ? "Empty Pokeball"
                    : `${pokemon.name} Lv. ${pokemon.level}`
                }
                style={{
                  width: erroredImages[index] ? "25px" : "40px", // If image errored, set to 25px, otherwise 40px
                  height: erroredImages[index] ? "25px" : "40px", // If image errored, set to 25px, otherwise 40px
                }}
              />
            </li>
          </Tooltip>
        ))}
      </ul>
    </Box>
  );
};

export default PokeNav;
