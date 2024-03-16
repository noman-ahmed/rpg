import React, { useState } from "react";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  TextField,
  Paper,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Avatar,
  Grid,
  Link as MuiLink,
} from "@mui/material";
import { Link } from "react-router-dom";

const steps = ["Fill out information", "Choose your starter", "Join a team"];

const formFieldsConfig = [
  { id: "username", label: "Username", type: "text" },
  { id: "email", label: "Email Address", type: "email" },
  { id: "password", label: "Password", type: "password" },
  { id: "confirmPassword", label: "Confirm Password", type: "password" },
];

const teamDescriptions = {
  "Team Rocket":
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.",
  "Team Aqua":
    "Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.",
  "Team Magma":
    "Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi.",
};

function RegisterForm() {
  let theme = createTheme({
    palette: {
      primary: {
        main: "#ea80fc",
      },
    },
  });

  theme = responsiveFontSizes(theme);

  const [activeStep, setActiveStep] = useState(0);
  const [formFields, setFormFields] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const avatars = {
    bulbasaur: "https://img.pokemondb.net/sprites/home/normal/bulbasaur.png",
    charmander: "https://img.pokemondb.net/sprites/home/normal/charmander.png",
    squirtle: "https://img.pokemondb.net/sprites/home/normal/squirtle.png",
    chikorita: "https://img.pokemondb.net/sprites/home/normal/chikorita.png",
    cyndaquil: "https://img.pokemondb.net/sprites/home/normal/cyndaquil.png",
    totodile: "https://img.pokemondb.net/sprites/home/normal/totodile.png",
    treecko: "https://img.pokemondb.net/sprites/home/normal/treecko.png",
    mudkip: "https://img.pokemondb.net/sprites/home/normal/mudkip.png",
    torchic: "https://img.pokemondb.net/sprites/home/normal/torchic.png",
    chimchar: "https://img.pokemondb.net/sprites/home/normal/chimchar.png",
    piplup: "https://img.pokemondb.net/sprites/home/normal/piplup.png",
    turtwig: "https://img.pokemondb.net/sprites/home/normal/turtwig.png",
  };

  // Set the first avatar as the default selected value
  const [avatar, setAvatar] = useState(Object.values(avatars)[0]);
  const [team, setTeam] = useState(Object.keys(teamDescriptions)[0]);
  const [errors, setErrors] = useState({});

  const handleChange = (prop) => (event) => {
    setFormFields({ ...formFields, [prop]: event.target.value });
  };

  const handleAvatarChange = (event) => {
    setAvatar(event.target.value);
  };

  const handleTeamChange = (event) => {
    setTeam(event.target.value);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  function getFormFields(fields) {
    return fields.map(({ id, label, type }) => (
      <TextField
        key={id}
        label={label}
        type={type}
        fullWidth
        margin="normal"
        value={formFields[id]}
        onChange={handleChange(id)}
        error={!!errors[id]}
        helperText={errors[id]}
      />
    ));
  }

  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return getFormFields(formFieldsConfig);
      case 1:
        // Find the name of the currently selected avatar for display
        const selectedAvatarName = Object.keys(avatars).find(
          (name) => avatars[name] === avatar
        );
        return (
          <FormControl fullWidth component="fieldset">
            <FormLabel component="legend">
              Choose your starter Pokemon
            </FormLabel>
            {/* Display selected Pokémon image, name, and level */}
            <Box sx={{ textAlign: "center", my: 2 }}>
              <Avatar
                src={avatar}
                sx={{ width: 100, height: 100, margin: "auto" }}
              />
              <Typography variant="h6" sx={{ mt: 2 }}>
                {selectedAvatarName.charAt(0).toUpperCase() +
                  selectedAvatarName.slice(1)}{" "}
                {/* Capitalize the name */}
              </Typography>
              <Typography variant="subtitle1">Level: 5</Typography>
            </Box>
            <RadioGroup
              aria-label="starter"
              name="starter"
              value={avatar}
              onChange={handleAvatarChange}
              row={false}
            >
              <Grid container sx={{ textAlign: "center" }}>
                {Object.entries(avatars).map(([name, url]) => (
                  <Grid
                    item
                    xs={4}
                    key={name}
                    sx={{ borderTop: "1px solid rgba(0, 0, 0, 0.12)", p: 4 }}
                  >
                    <FormControlLabel
                      value={url}
                      control={<Radio />}
                      label={
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Avatar
                            sx={{
                              width: 64,
                              height: 64,
                              marginRight: theme.spacing(1),
                            }}
                            src={url}
                            alt={name}
                          />
                        </Box>
                      }
                    />
                  </Grid>
                ))}
              </Grid>
            </RadioGroup>
          </FormControl>
        );
      case 2:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <FormControl component="fieldset" fullWidth>
                <FormLabel component="legend">Join a team</FormLabel>
                <RadioGroup
                  aria-label="team"
                  name="team"
                  value={team}
                  onChange={handleTeamChange}
                >
                  {Object.entries(teamDescriptions).map(
                    ([teamKey, description]) => (
                      <FormControlLabel
                        key={teamKey}
                        value={teamKey}
                        control={<Radio />}
                        label={`${teamKey}`} // Simplified label
                      />
                    )
                  )}
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper
                elevation={3}
                sx={{
                  padding: 2,
                  minHeight: "100px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography variant="body1" sx={{ textAlign: "center" }}>
                  {teamDescriptions[team]}{" "}
                  {/* Display the description of the selected team */}
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        );
      default:
        return "Unknown step";
    }
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: { xs: "100%", md: "50%" },
        mx: "auto",
      }}
    >
      {/* Wrap Stepper and Paper in a Box to control their widths together */}
      <Box
        sx={{
          width: "100%",
          maxWidth: 600,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Stepper
          activeStep={activeStep}
          alternativeLabel
          sx={{ width: "100%", mb: 2 }}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Paper
          elevation={0}
          variant="outlined"
          sx={{ p: { xs: 2, sm: 3 }, mt: 2, width: "100%" }}
        >
          {/* Content inside Paper is already constrained to the same width by the outer Box */}
          {getStepContent(activeStep)}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              gap: theme.spacing(2),
              mt: theme.spacing(2),
              width: "100%",
            }}
          >
            <Typography variant="body2">
              Already have an account?{" "}
              <MuiLink component={Link} to="/login" underline="hover">
                Login Now
              </MuiLink>
            </Typography>
            <Box>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ textTransform: "none" }}
              >
                Back
              </Button>
              <Button
                variant="contained"
                onClick={handleNext}
                sx={{ textTransform: "none", color: "#fff", ml: 1 }}
              >
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}

export default RegisterForm;
