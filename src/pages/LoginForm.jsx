import React, { useState } from "react";
import authService from "../services/authService"; // Ensure this path is correct
import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  Link as MuiLink,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

function LoginForm() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); // This is your context's login method

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const { username, password } = form;
      const { userId, token } = await authService.login(username, password); // Destructure userId and token directly

      login({ username, userId, token }); // Pass userId and token directly
      navigate("/dashboard");
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data.message
        : error.message;
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
