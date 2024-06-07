import React, { useState, useEffect } from "react";
import Layout from "../Layout"; // Adjust the path as necessary
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  useTheme, // Import useTheme to access the theme
} from "@mui/material";
import axios from "axios";

const MainContent = () => {
  const [users, setUsers] = useState([]);
  const theme = useTheme(); // Use the theme for styling

  useEffect(() => {
    // Fetch the users from your API
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/user`
        ); // Ensure the endpoint matches your API
        setUsers(data);
      } catch (error) {
        console.error("Failed to fetch users", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          width: "50%",
          margin: "2rem auto",
        }}
      >
        <Table aria-label="individual rankings">
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
                ID
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
                Username
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user.userId}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  backgroundColor: theme.palette.action.hover,
                }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ fontWeight: "700" }}
                >
                  {user.userId}
                </TableCell>
                <TableCell align="right">{user.username}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

function Individual() {
  return (
    <Layout pageTitle="Individual Rankings">
      <MainContent />
    </Layout>
  );
}

export default Individual;
