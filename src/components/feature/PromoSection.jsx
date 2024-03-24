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
        color: "primary.main",
        marginTop: "10px",
        "&:hover": { textDecoration: "underline" },
      }}
      onClick={claimPromoAction}
    >
      Claim Promo
    </Button>
  </Box>
);

export default PromoSection;
