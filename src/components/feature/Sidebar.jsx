import React, { useState, useEffect } from "react";
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
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MenuIcon from "@mui/icons-material/Menu";
import PromoSection from "./PromoSection";
// Removed useSelector, useDispatch imports from redux
import {
  useAuthState,
  useAuthDispatch,
  logoutUser,
} from "../../contexts/AuthContext"; // Adjust import path as necessary
import ashImage from "../../assets/Ash.png";

const Sidebar = ({ menuSections }) => {
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [mobileOpen, setMobileOpen] = useState(false);

  const authDispatch = useAuthDispatch(); // Use context's dispatch function
  const { user: user, userInfo: userInfo } = useAuthState(); // Retrieve user info from context state

  const paperBackgroundColor = "#0F1419";
  const textColor = "#FFFFFF";
  const pokemonName = "Shiny Articuno";
  const pokemonSpriteUrl =
    "https://img.pokemondb.net/sprites/home/shiny/1x/articuno.png";
  const drawerWidth = isMobile ? "100%" : 240;

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const handleSignOut = () => {
    logoutUser(authDispatch); // Use logoutUser from your context
  };

  return (
    <>
      {isMobile && (
        <IconButton
          onClick={handleDrawerToggle}
          sx={{
            color: theme.palette.getContrastText(
              theme.palette.background.default
            ),
            position: "absolute",
            zIndex: theme.zIndex.drawer + 1,
            ...(mobileOpen && { display: "none" }),
          }}
        >
          <MenuIcon />
        </IconButton>
      )}
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            backgroundColor: paperBackgroundColor,
            color: textColor,
          },
          zIndex: theme.zIndex.drawer + (mobileOpen ? 0 : 2),
        }}
      >
        <Box sx={{ overflow: "auto", flex: 1 }}>
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
              src={ashImage} // Use the imported image
              sx={{ width: 120, height: 120, marginBottom: 2 }}
              alt="Ash"
            />
            <Typography
              variant="subtitle1"
              sx={{ color: textColor, fontWeight: "bold" }}
            >
              #{userInfo?.userId ? userInfo.userId : "N/A"} -{" "}
              {userInfo?.username ? userInfo.username : "N/A"}
            </Typography>
          </Box>

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
                ".MuiAccordionSummary-root": {
                  padding: "0 16px",
                },
                ".MuiAccordionDetails-root": {
                  padding: "0 16px",
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
                    onClick={
                      item.name === "Sign Out" ? handleSignOut : undefined
                    }
                    component={item.name === "Sign Out" ? "div" : Link}
                    to={item.name === "Sign Out" ? "/" : item.path}
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
    </>
  );
};

export default Sidebar;
