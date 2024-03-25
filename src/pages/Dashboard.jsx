import React from "react";
import Layout from "./Layout";
import {
  Typography,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Grid,
  useTheme,
  Box,
} from "@mui/material";
import { trainerStats } from "../data/trainerStats";
import { releaseNotes } from "../data/releaseNotes";

// Utility function to format stat keys
const formatStatKey = (key) => {
  // Split camelCase string and capitalize first letter of each word
  const formatted = key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase());
  // Add colon at the end
  return `${formatted}:`;
};

const MainContent = () => {
  const theme = useTheme();

  return (
    <Grid
      container
      spacing={2}
      sx={{
        width: "100%",
        margin: "auto",
      }}
    >
      <Grid item xs={12} md={8}>
        <Box
          sx={{
            width: "100%", // Ensure the banner takes the full width of its container
            height: 75, // Set the height of the banner
            backgroundImage:
              'url("https://assets.pokemon.com//assets/cms2/img/misc/virtual-backgrounds/pokemon/scorbunny.jpg")',
            backgroundSize: "cover",
            backgroundPosition: "15% 30%",
            backgroundRepeat: "no-repeat",
            borderRadius: theme.shape.borderRadius,
            mb: 2,
            border: "2px solid #0F1419",
          }}
        />
        <TableContainer
          component={Paper}
          sx={{
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
          }}
        >
          <Table aria-label="trainer stats">
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    backgroundColor: "#0F141A",
                    color: theme.palette.getContrastText("#0F141A"),
                    borderTop: "3px solid #ea80fc",
                    fontSize: "1.2rem",
                  }}
                >
                  Info
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    fontWeight: "bold",
                    backgroundColor: "#0F141A",
                    color: theme.palette.getContrastText("#0F141A"),
                    borderTop: "3px solid #ea80fc",
                    fontSize: "1.2rem",
                  }}
                >
                  Stats
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.entries(trainerStats).map(([stat, value], index) => (
                <TableRow
                  key={stat}
                  sx={{
                    backgroundColor:
                      index % 2 ? theme.palette.action.hover : "inherit",
                  }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ fontWeight: "700" }}
                  >
                    {formatStatKey(stat)}
                  </TableCell>
                  <TableCell align="right">
                    {Array.isArray(value) ? (
                      <div style={{ display: "flex", justifyContent: "right" }}>
                        {value.map((imageUrl, index) => (
                          <img
                            key={index}
                            src={imageUrl}
                            alt="Badge"
                            style={{
                              width: "25px",
                              height: "25px",
                              marginLeft: "5px",
                            }}
                          />
                        ))}
                      </div>
                    ) : (
                      value
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Paper sx={{ overflow: "auto", mt: 2 }}>
          <Typography
            variant="h4"
            gutterBottom
            color="textPrimary"
            sx={{
              backgroundColor: "#0F141A",
              borderTop: "3px solid #ea80fc",
              p: "1rem",
              lineHeight: "1.5rem",
              fontSize: "1.2rem",
              color: "#ffffff",
              fontWeight: "700",
            }}
          >
            News
          </Typography>
          <Grid
            container
            spacing={2}
            sx={{ display: "flex", alignItems: "stretch", p: 4 }}
          >
            <Typography variant="h5" sx={{ fontWeight: "bold", mt: 2, mb: 1 }}>
              More content to come..
            </Typography>
          </Grid>
        </Paper>
      </Grid>

      <Grid item xs={12} md={4} sx={{ p: 2 }}>
        <Paper sx={{ overflow: "auto" }}>
          <Typography
            variant="h4"
            gutterBottom
            color="textPrimary"
            sx={{
              backgroundColor: "#0F141A",
              borderTop: "3px solid #ea80fc",
              p: "1rem",
              lineHeight: "1.5rem",
              fontSize: "1.2rem",
              color: "#ffffff",
              fontWeight: "700",
            }}
          >
            RPG Updates
          </Typography>
          <Grid
            container
            spacing={2}
            sx={{ display: "flex", alignItems: "stretch", p: 4 }}
          >
            {releaseNotes.map((note, index) => (
              <Grid item xs={12} md={12} key={index} sx={{ display: "flex" }}>
                <Paper
                  sx={{
                    mb: 2,
                    p: 2,
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: "bold", mt: 2, mb: 1 }}
                  >
                    {note.title}
                  </Typography>
                  {note.changes.map((change, changeIndex) => (
                    <div
                      key={changeIndex}
                      sx={{ display: "flex", alignItems: "center", mb: 1 }}
                    >
                      <Typography
                        variant="overline"
                        sx={{
                          backgroundColor: theme.palette.success.main,
                          color: "#fff",
                          borderRadius: 1,
                          px: 1,
                          py: 0.25,
                          mr: 1,
                        }}
                      >
                        {change.type}
                      </Typography>
                      <Typography variant="body2">
                        {change.description}
                      </Typography>
                    </div>
                  ))}
                  <Typography
                    variant="caption"
                    display="block"
                    gutterBottom
                    sx={{ mb: 2, mt: "auto" }}
                  >
                    {note.date}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

function Dashboard() {
  return (
    <Layout pageTitle="Trainer Stats">
      <MainContent />
    </Layout>
  );
}

export default Dashboard;
