import React from "react";
import Layout from "../Layout";
import {
  useTheme,
  Grid,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { MonetizationOn } from "@mui/icons-material";
import { useAuthState } from "../../contexts/AuthContext"; // Assuming user info is stored directly under user key
import ashImage from "../../assets/Ash.png";

const MainContent = () => {
  const theme = useTheme(); // Use the theme
  const { userInfo } = useAuthState(); // Assuming user info is stored directly under user key

  // Dummy data for Pokemon roster (replace with actual data)
  const pokemonRoster = [
    {
      name: "Rayquaza Lv. 5",
      imageUrl: "https://img.pokemondb.net/sprites/home/normal/1x/rayquaza.png",
    },
    {
      name: "Celebi Lv. 10",
      imageUrl: "https://img.pokemondb.net/sprites/home/normal/1x/celebi.png",
    },
    {
      name: "Mew Lv. 15",
      imageUrl: "https://img.pokemondb.net/sprites/home/normal/1x/mew.png",
    },
    {
      name: "Regirock Lv. 5",
      imageUrl: "https://img.pokemondb.net/sprites/home/normal/1x/regirock.png",
    },
    {
      name: "Regice Lv. 10",
      imageUrl: "https://img.pokemondb.net/sprites/home/normal/1x/regice.png",
    },
    {
      name: "Registeel Lv. 15",
      imageUrl:
        "https://img.pokemondb.net/sprites/home/normal/1x/registeel.png",
    },
  ];

  return (
    <>
      {/* User Details */}
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{
          m: 2,
          pt: 2,
          pb: 2,
          pl: 4,
          pr: 4,
          margin: "2rem auto",
        }}
      >
        <Grid
          item
          xs={12}
          md={4}
          sx={{
            p: 4,
            backgroundColor: "#0F141A",
            borderTop: "3px solid #ea80fc",
            borderRadius: "10px",
          }}
        >
          <Avatar
            alt={userInfo?.username || "User"}
            src={ashImage}
            sx={{
              width: theme.spacing(20),
              height: theme.spacing(20),
              margin: "0 auto 2rem auto",
            }}
          />
          <Typography
            variant="h3"
            gutterBottom
            sx={{ color: "#EA7FFB", textAlign: "center" }}
          >
            {userInfo?.username || "N/A"}
          </Typography>

          {/* Table for User Details */}
          <Table>
            <TableBody>
              {[
                { label: "User ID:", value: `#${userInfo?.userId || "N/A"}` },
                { label: "Starter:", value: userInfo?.starterPokemon || "N/A" },
                { label: "Team:", value: userInfo?.team || "N/A" },
                { label: "Trainer Level:", value: "100" },
                {
                  label: "Currency:",
                  value: "500",
                },
              ].map((row, index) => (
                <TableRow
                  key={index}
                  sx={{
                    borderBottom: "2px solid rgba(224, 224, 224, .2)",
                  }}
                >
                  <TableCell
                    sx={{
                      color: "#fff",
                      pl: 0,
                      textTransform: "capitalize",
                      fontWeight: "700",
                    }}
                  >
                    {row.label}
                  </TableCell>
                  <TableCell
                    sx={{ color: "#fff", pl: 0, textTransform: "capitalize" }}
                  >
                    {row.value}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Grid>

        {/* Pokemon Roster */}
        <Grid
          item
          xs={12}
          md={6}
          spacing={2} // Adjusts the space between items
          justifyContent="center" // Centers the grid items if they don't fill the entire row width
          sx={{
            m: 2,
            p: 4,
            borderRadius: "10px",
            margin: "2rem auto",
          }}
        >
          {/* Pokemon Roster */}
          <Grid
            item
            xs={12}
            md={12}
            container
            sx={{
              p: 4,
              textAlign: "center",
            }}
          >
            {pokemonRoster.map((pokemon, index) => (
              <Grid
                item
                key={index}
                xs={6}
                sm={4}
                md={4}
                spacing={2}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  border: "2px solid #F5F5F5",
                  padding: "1.2rem",
                }}
              >
                {" "}
                {/* Adjust for 2x3 layout */}
                <Avatar
                  alt={pokemon.name}
                  src={pokemon.imageUrl}
                  sx={{
                    width: theme.spacing(15),
                    height: theme.spacing(15),
                    marginBottom: theme.spacing(1),
                    margin: "0 auto",
                  }}
                />
                <Typography
                  variant="h6"
                  align="center"
                  color="textPrimary"
                  sx={{
                    fontWeight: "700",
                    fontSize: "0.875rem",
                    margin: "1rem",
                  }}
                >
                  {pokemon.name}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

const Profile = () => {
  return (
    <Layout pageTitle="My Profile">
      <MainContent />
    </Layout>
  );
};

export default Profile;
