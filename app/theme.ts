import { createTheme } from "@mui/material/styles";

const gmuTheme = createTheme({
  palette: {
    primary: { main: "#006633" }, // GMU Green
    secondary: { main: "#FFCC33" }, // GMU Gold
    background: { default: "#f5f7f5" },
  },
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
});

export default gmuTheme;
