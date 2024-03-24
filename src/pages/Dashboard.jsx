import React from "react";
import Layout from "./Layout"; // Adjust the path as necessary
import {
  Typography,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  useTheme,
} from "@mui/material";
import { trainerStats } from "../data/trainerStats"; // Ensure this import points to the correct location

const MainContent = () => {
  const theme = useTheme(); // Use the theme

  return (
    <Box sx={{ display: "flex", flexDirection: "row", width: "100%" }}>
      {/* Column 1: Trainer Stats */}
      <Box sx={{ flex: 3, marginRight: "2%" }}>
        {" "}
        {/* Adjusts to about 75% width */}
        <Typography variant="h3" gutterBottom color="textPrimary">
          Trainer Stats
        </Typography>
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
                  sx={{ color: theme.palette.text.primary, fontWeight: "bold" }}
                >
                  <Typography variant="h5">Info</Typography>
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ color: theme.palette.text.primary, fontWeight: "bold" }}
                >
                  <Typography variant="h5">Stats</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.entries(trainerStats).map(([stat, value]) => (
                <TableRow key={stat}>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ color: theme.palette.text.primary }}
                  >
                    {stat}
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{ color: theme.palette.text.primary }}
                  >
                    {value}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Column 2: News, Release Notes, Updates */}
      <Box sx={{ flex: 1 }}>
        {" "}
        {/* Adjusts to about 25% width */}
        <Typography variant="h4" gutterBottom color="textPrimary">
          News & Updates
        </Typography>
        {/* Insert content for news, release notes, and updates here */}
      </Box>
    </Box>
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
