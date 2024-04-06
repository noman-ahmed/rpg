import React from "react";
import Layout from "../Layout";
import {
  useTheme,
  Grid,
  Avatar,
  Table,
  TableContainer,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
} from "@mui/material";

const MainContent = () => {
  const theme = useTheme(); // Use the theme

  // Dummy data for Pokemon roster (replace with actual data)
  const pokemonRoster = [
    {
      name: "Rayquaza",
      level: "5",
      imageUrl: "https://img.pokemondb.net/sprites/home/normal/1x/rayquaza.png",
    },
    {
      name: "Celebi",
      level: "10",
      imageUrl: "https://img.pokemondb.net/sprites/home/normal/1x/celebi.png",
    },
    {
      name: "Mew",
      level: "15",
      imageUrl: "https://img.pokemondb.net/sprites/home/normal/1x/mew.png",
    },
    {
      name: "Regirock",
      level: "5",
      imageUrl: "https://img.pokemondb.net/sprites/home/normal/1x/regirock.png",
    },
    {
      name: "Regice",
      level: "10",
      imageUrl: "https://img.pokemondb.net/sprites/home/normal/1x/regice.png",
    },
    {
      name: "Registeel",
      level: "15",
      imageUrl:
        "https://img.pokemondb.net/sprites/home/normal/1x/registeel.png",
    },
  ];

  return (
    <>
      {/* Pokemon Roster Table */}
      <Grid container sx={{ m: 2, pt: 2, pb: 2, pl: 4, pr: 4 }}>
        <Grid item xs={12} md={4}>
          <TableContainer
            component={Paper}
            sx={{
              backgroundColor: theme.palette.background.paper,
              color: theme.palette.text.primary,
              mb: 2,
            }}
          >
            <Table aria-label="pokemon roster">
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      backgroundColor: "#0F141A",
                      color: theme.palette.getContrastText("#0F141A"),
                      borderTop: "3px solid #ea80fc",
                    }}
                  >
                    Pokémon
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      fontWeight: "bold",
                      backgroundColor: "#0F141A",
                      color: theme.palette.getContrastText("#0F141A"),
                      borderTop: "3px solid #ea80fc",
                    }}
                  >
                    Level
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pokemonRoster.map((pokemon, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      backgroundColor:
                        index % 2 ? theme.palette.action.hover : "inherit",
                    }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: theme.spacing(2),
                      }}
                    >
                      <Avatar
                        alt={pokemon.name}
                        src={pokemon.imageUrl}
                        sx={{
                          width: theme.spacing(10),
                          height: theme.spacing(10),
                        }}
                      />
                      <Typography>{pokemon.name}</Typography>
                    </TableCell>
                    <TableCell align="right">Lv. {pokemon.level}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </>
  );
};

function TeamRoster() {
  return (
    <Layout pageTitle="Team Roster">
      <MainContent />
    </Layout>
  );
}

export default TeamRoster;
