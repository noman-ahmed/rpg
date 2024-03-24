import React from "react";
import { Box, Typography, Button } from "@mui/material";

const PromoSection = ({ pokemonName, pokemonSpriteUrl, claimPromoAction }) => (
  <Box
    sx={{
      height: "200px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      margin: "16px",
      marginTop: "24px",
      borderTop: "3px solid #ea80fc",
    }}
  >
    <Typography variant="h6" sx={{ textAlign: "center", color: "#ffffff" }}>
      {pokemonName}
    </Typography>
    <img src={pokemonSpriteUrl} width="75px" alt={pokemonName} />
    <Button
      variant="outlined"
      sx={{
        borderColor: "#ea80fc", // Set the border color to pink
        color: "#ea80fc", // Set the text color to pink
        marginTop: "10px",
        "&:hover": {
          textDecoration: "underline",
          borderColor: "#ea80fc",
          color: "#ea80fc",
        },
      }}
      onClick={claimPromoAction}
    >
      Claim Promo
    </Button>
  </Box>
);

export default PromoSection;
