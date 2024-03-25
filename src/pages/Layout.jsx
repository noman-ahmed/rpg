import React from "react";
import {
  Box,
  Container,
  ThemeProvider,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
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

const Layout = ({ children, pageTitle }) => {
  const [pokemonData, setPokemonData] = React.useState(initialPokemonData);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
          backgroundImage: `url(${"src/assets/gamebg.png"})`,
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
          backgroundSize: "50%",
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
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            backgroundColor: backgroundColor,
          }}
        >
          {/* This Box wraps the PokeNav and the title */}
          <Box
            sx={{
              display: "flex",
              flexDirection: isMobile ? "column-reverse" : "row", // Column-reverse for mobile, row for desktop
              alignItems: "center",
              justifyContent: isMobile ? "center" : "space-between", // Center for mobile, space-between for desktop
              backgroundColor: "#f5f5f5", // Dark color as fallback
              color: textColor,
              pr: 4,
              pl: 4,
            }}
          >
            <Typography
              variant="h4"
              sx={{
                color: textColor,
                order: isMobile ? 2 : 1,
                fontWeight: "700",
              }}
            >
              {pageTitle}
            </Typography>
            <PokeNav
              pokemonData={pokemonData}
              onPokemonClick={handlePokemonClick}
              textColor={textColor}
              sx={{ order: isMobile ? 1 : 2 }}
            />
          </Box>
          <Container
            sx={{
              mt: 0,
              display: "flex",
              flexDirection: "column",
            }}
            maxWidth={false} // This ensures the Container always takes full width
          >
            {children}
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Layout;
