import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  Link as MuiLink,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux"; // Import useDispatch
import { login } from "../auth/authSlice"; // Update import path as necessary

function LoginForm() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Use useDispatch to get the dispatch function

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      // Dispatch the login async thunk with username and password
      const actionResult = await dispatch(
        login({ username: form.username, password: form.password })
      );
      if (login.fulfilled.match(actionResult)) {
        // Navigate to dashboard if login was successful
        navigate("/dashboard");
      } else {
        // Handle case where login wasn't successful
        // Error message should ideally come from the rejected action's payload or error
        const errorMessage =
          actionResult.error?.message || "Login failed. Please try again.";
        setError(errorMessage);
      }
    } catch (error) {
      // Handle unexpected errors
      const errorMessage = error.message || "An unexpected error occurred.";
      setError(errorMessage);
    }
  };

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        "& .MuiTextField-root": { m: 1, width: "25ch" },
        textAlign: "center",
      }}
    >
      <Paper elevation={0} variant="outlined" sx={{ p: 4 }}>
        <TextField
          error={!!error}
          helperText={error || " "}
          label="Username"
          name="username"
          variant="outlined"
          fullWidth
          value={form.username}
          onChange={handleChange}
        />
        <TextField
          error={!!error}
          helperText={error || " "}
          label="Password"
          name="password"
          variant="outlined"
          type="password"
          fullWidth
          value={form.password}
          onChange={handleChange}
        />
        <Button type="submit" variant="contained" sx={{ mt: 2, mb: 2 }}>
          Login
        </Button>
        <Typography variant="body2">
          Don't have an account?{" "}
          <MuiLink component={Link} to="/register" underline="hover">
            Sign Up Now
          </MuiLink>
        </Typography>
      </Paper>
    </Box>
  );
}

export default LoginForm;
