import { createTheme } from "@mui/material/styles";

const primaryMainColor = "#ea80fc";
const backgroundColor = "#202020";
const paperBackgroundColor = "#2c2c2c";
const textColor = "rgba(255, 255, 255, 0.7)";

export const theme = createTheme({
  palette: {
    primary: {
      main: primaryMainColor,
    },
    background: {
      default: backgroundColor,
    },
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: paperBackgroundColor,
          color: textColor,
        },
      },
    },
  },
  typography: {
    h6: {
      fontSize: "1.25rem",
      fontWeight: 700,
      color: primaryMainColor,
    },
    body1: {
      color: textColor,
    },
  },
});
