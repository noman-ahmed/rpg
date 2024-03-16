import React, { useState } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  TextField,
  Link as MuiLink,
} from "@mui/material";
import { Link } from "react-router-dom";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ username: "", password: "" });

  const handleSubmit = (event) => {
    event.preventDefault();
    let newErrors = { username: "", password: "" };
    const validUsername = "admin";
    const validPassword = "secret";

    if (username !== validUsername) {
      newErrors.username = "Invalid Username";
    }
    if (password !== validPassword) {
      newErrors.password = "Invalid Password";
    }

    setErrors(newErrors);

    if (!newErrors.username && !newErrors.password) {
      console.log("Login successful!");
      setUsername("");
      setPassword("");
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
        "& .MuiTextField-root": {
          m: 1,
          width: { xs: "90%", sm: "80%", md: "25ch" },
        }, // Responsive width
        textAlign: "center",
      }}
    >
      {" "}
      <Paper elevation={0} variant="outlined" sx={{ p: 4 }}>
        <TextField
          error={!!errors.username}
          helperText={errors.username}
          label="Username"
          variant="outlined"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          error={!!errors.password}
          helperText={errors.password}
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 2, mb: 1, bgcolor: "primary.main", color: "#fff" }}
        >
          Login
        </Button>
        <Box mt={2}>
          <Typography variant="body2">
            Don't have an account?{" "}
            <MuiLink
              component={Link}
              to="/register"
              underline="hover"
              color="primary"
            >
              Sign Up Now
            </MuiLink>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}

export default LoginForm;
