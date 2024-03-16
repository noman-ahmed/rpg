import React from "react";
import { Box, Grid, Typography, Button } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import styles from "../components/layout/layout.module.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ea80fc", // Using Pokémon-themed pink as primary color
    },
  },
});

function Register() {
  return (
    <ThemeProvider theme={theme}>
      <Box className={`${styles.BoxTheme} wrapper`} component="main">
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          sx={{ width: "100%", maxWidth: 1200 }} // Responsive width
        >
          <Grid item xs={12}>
            <Typography variant="h3" sx={{ mb: 4, textAlign: "center" }}>
              Discord
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}

export default Register;
