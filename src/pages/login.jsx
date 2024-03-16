import React from "react";
import LoginForm from "./LoginForm.jsx";
import { Link } from "react-router-dom";
import { Box, Grid, Typography, Button } from "@mui/material";
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material/styles";
import styles from "../components/layout/layout.module.css";

let theme = createTheme({
  palette: {
    primary: {
      main: "#ea80fc",
    },
  },
});

theme = responsiveFontSizes(theme);

function Login() {
  return (
    <ThemeProvider theme={theme}>
      <Box className={`${styles.BoxTheme} wrapper`} component="main">
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          sx={{ width: "100%", maxWidth: 1200 }} // Responsive width
        >
          <Grid item xs={12} textAlign={"center"}>
            <Typography variant="h3" sx={{ mb: 4, textAlign: "center" }}>
              Login{" "}
            </Typography>
            <img
              src="https://img.pokemondb.net/sprites/home/normal/blaziken-mega.png"
              height="150px"
              alt="Professor"
              style={{ marginBottom: "1rem" }}
            />
          </Grid>
          <LoginForm />
        </Grid>
      </Box>
    </ThemeProvider>
  );
}

export default Login;
