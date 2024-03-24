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
      justifyContent="center"
      spacing={2}
      sx={{ width: "100%", maxWidth: 1200, margin: "auto" }}
    >
      <Grid item xs={12}>
        <Typography variant="h3" gutterBottom color="textPrimary">
          Trainer Stats
        </Typography>
      </Grid>

      <Grid item xs={12} md={6}>
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
                  }}
                >
                  Stats
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.entries(trainerStats).map(([stat, value]) => (
                <TableRow key={stat}>
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

      <Grid item xs={12} md={6}>
        <Typography
          variant="h4"
          gutterBottom
          color="textPrimary"
          sx={{ border: "1px solid #E0E0E0", borderRadius: "10px", p: 4 }}
        >
          News & Updates
        </Typography>
        {/* Insert content for news, release notes, and updates here */}
      </Grid>
    </Grid>
  );
};

function Dashboard() {
  return (
    <Layout>
      <MainContent />
    </Layout>
  );
}

export default Dashboard;
