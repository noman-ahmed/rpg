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
      <Grid item xs={12} md={4} sx={{ mb: 4 }}>
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
      </Grid>

      <Grid item xs={12} sx={{ p: 2 }}>
        <Paper sx={{ overflow: "auto", p: 4 }}>
          <Typography variant="h4" gutterBottom color="textPrimary">
            RPG Updates
          </Typography>
          <Grid
            container
            spacing={2}
            sx={{ display: "flex", alignItems: "stretch" }}
          >
            {releaseNotes.map((note, index) => (
              <Grid item xs={12} md={6} key={index} sx={{ display: "flex" }}>
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
