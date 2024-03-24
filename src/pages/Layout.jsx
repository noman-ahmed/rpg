import React from "react";
import { Box, Container, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import CustomDrawer from "../components/feature/CustomDrawer.jsx";
import PromoSection from "../components/feature/PromoSection";
import PokeNav from "../components/feature/PokeNav.jsx";
import { initialPokemonData } from "../data/pokemonData.jsx";
import { menuSections } from "../data/menuSections.jsx";

const drawerWidth = 260;
const primaryMainColor = "#ea80fc"; // This can remain unchanged if it suits the new theme
const backgroundColor = "#ffffff"; // Updated to white
const paperBackgroundColor = "#ffffff"; // Paper elements also use white background
const textColor = "#0F1419"; // Dark text for contrast against white background

const theme = createTheme({
  palette: {
    primary: { main: primaryMainColor },
    background: { default: backgroundColor },
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: { backgroundColor: paperBackgroundColor, color: textColor },
      },
    },
  },
  typography: {
    h6: { fontSize: "1.25rem", fontWeight: 700, color: textColor }, // Adjust for better visibility
    body1: { color: textColor }, // Ensure body text is also readable
  },
});

const Layout = ({ children }) => {
  const [pokemonData, setPokemonData] = React.useState(initialPokemonData);

  const handlePokemonClick = (index) => {
    if (index !== 0) {
      setPokemonData((currentPokemonData) => {
        const newData = [...currentPokemonData];
        const selectedItem = newData[index];
        newData[index] = newData[0];
        newData[0] = selectedItem;
        return newData;
      });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          bgcolor: "background.default",
          minHeight: "100vh",
        }}
      >
        <CustomDrawer
          drawerWidth={drawerWidth}
          paperBackgroundColor={paperBackgroundColor}
          textColor={textColor}
          menuSections={menuSections}
          promoSection={<PromoSection textColor={textColor} />}
        />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            backgroundColor: backgroundColor, // Ensure the main content area also uses the updated background color
          }}
        >
          <PokeNav
            pokemonData={pokemonData}
            onPokemonClick={handlePokemonClick}
            textColor={textColor}
          />
          <Container
            sx={{
              mt: 8,
              display: "flex",
              flexDirection: "column",
            }}
          >
            {children}
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Layout;
