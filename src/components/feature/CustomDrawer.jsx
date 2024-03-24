import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Box,
  Drawer,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  ListItem,
  ListItemText,
  Typography,
  Avatar,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PromoSection from "./PromoSection"; // Adjust the path as necessary

const CustomDrawer = ({ drawerWidth, menuSections }) => {
  const location = useLocation();
  const paperBackgroundColor = "#0F1419";
  const textColor = "#FFFFFF";

  // Example Pokémon for the promo section
  const pokemonName = "Shiny Articuno";
  const pokemonSpriteUrl =
    "https://img.pokemondb.net/sprites/home/shiny/1x/articuno.png";

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          backgroundColor: paperBackgroundColor,
          color: textColor,
          display: "flex",
          flexDirection: "column",
          height: "100%",
        },
      }}
    >
      <Box sx={{ overflow: "auto", flex: 1 }}>
        {/* Avatar Section */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            padding: "16px",
            borderBottom: "3px solid #ea7ffb",
          }}
        >
          <Avatar
            src="https://archives.bulbagarden.net/media/upload/thumb/8/8b/Spr_Masters_Ash_2.png/240px-Spr_Masters_Ash_2.png"
            sx={{ width: 120, height: 120, marginBottom: 2 }}
            alt="Ash"
          />
          <Typography
            variant="subtitle1"
            sx={{ color: textColor, fontWeight: "bold" }}
          >
            Nomes - #1
          </Typography>
        </Box>

        {/* Dashboard Link */}
        <ListItem
          button
          component={Link}
          to="/dashboard"
          sx={{
            backgroundColor:
              location.pathname === "/dashboard"
                ? "#3c3c3c"
                : paperBackgroundColor,
            color: textColor,
            "&:hover": { backgroundColor: "#3c3c3c" },
          }}
        >
          <ListItemText
            primary="Dashboard"
            primaryTypographyProps={{
              sx: { fontSize: "1rem", fontWeight: "700", color: textColor },
            }}
          />
        </ListItem>
        {/* Menu Sections */}
        {menuSections.map((section, index) => (
          <Accordion
            key={index}
            defaultExpanded={section.items.some(
              (item) => location.pathname === item.path
            )}
            sx={{
              backgroundColor: paperBackgroundColor,
              color: textColor,
              boxShadow: "none",
              "&:before": { display: "none" },
              "&.Mui-expanded": { margin: "auto" },
              "&:not(:last-child)": { marginBottom: 0 },
              // Ensure no extra padding/margin is added on expansion
              ".MuiAccordionSummary-root": {
                padding: "0 16px", // Adjust as needed, but keep consistent
              },
              ".MuiAccordionDetails-root": {
                padding: "0 16px", // Adjust as needed, but keep consistent
              },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: textColor }} />}
              aria-controls={`panel${index}a-content`}
              id={`panel${index}a-header`}
            >
              <Typography
                sx={{ fontWeight: "700", fontSize: "1rem", color: textColor }}
              >
                {section.title}
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ flexDirection: "column", padding: 0 }}>
              {section.items.map((item) => (
                <ListItem
                  button
                  key={item.name}
                  component={Link}
                  to={item.path}
                  sx={{
                    backgroundColor:
                      location.pathname === item.path
                        ? "#3c3c3c"
                        : "transparent",
                    color: textColor,
                    "&:hover": { backgroundColor: "#3c3c3c" },
                  }}
                >
                  <ListItemText
                    primary={item.name}
                    primaryTypographyProps={{
                      sx: { fontSize: ".875rem", color: textColor },
                    }}
                  />
                </ListItem>
              ))}
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
      {/* Promo Section Fixed at the Bottom */}
      <Box
        sx={{
          padding: "16px",
          backgroundColor: paperBackgroundColor,
          textAlign: "center",
        }}
      >
        <PromoSection
          pokemonName={pokemonName}
          pokemonSpriteUrl={pokemonSpriteUrl}
        />
      </Box>
    </Drawer>
  );
};

export default CustomDrawer;
