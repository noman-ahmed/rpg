import React from "react";
import { Link } from "react-router-dom";
import { Box, Grid, Typography, Button, Paper } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ProfessorImage from "../assets/professor.png";
import styles from "../components/layout/layout.module.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ea80fc", // Using Pokémon-themed pink as primary color
    },
  },
});

const Index = () => (
  <ThemeProvider theme={theme}>
    <Box className={`${styles.BoxTheme} wrapper`} component="main">
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ maxWidth: 1200, m: "auto", textAlign: "center" }}
      >
        <Grid item xs={12}>
          <Typography variant="h3" sx={{ mb: 4 }}>
            Pokémon Legacy
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper elevation={0} variant="outlined" sx={{ p: 6 }}>
            <Box
              component="img"
              src={ProfessorImage}
              height="175px"
              alt="Professor"
            />
            <Typography variant="h4" sx={{ pt: 2, pb: 2 }}>
              Embark on a{" "}
              <Box
                component="span"
                sx={{ color: "primary.main", fontWeight: "bold" }}
              >
                legendary
              </Box>{" "}
              journey!
            </Typography>
            <hr />
            <Typography variant="h6" sx={{ fontWeight: "bold", mt: 2 }}>
              A world teeming with Pokémon awaits!
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Catch, train, and battle alongside them in Pokémon Legacy RPG.
              Explore diverse regions, trade with friends, conquer mini-games,
              and forge lifelong bonds. Are you ready to become a Pokémon
              Master?
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Link to="/register" style={{ textDecoration: "none" }}>
                <Button
                  variant="outlined"
                  sx={{
                    color: "primary.main",
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  Register
                </Button>
              </Link>
              <Link to="/login" style={{ textDecoration: "none" }}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "primary.main",
                    color: "#fff",
                    fontWeight: "bold",
                    ml: 1,
                  }}
                >
                  Log In
                </Button>
              </Link>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  </ThemeProvider>
);

export default Index;
