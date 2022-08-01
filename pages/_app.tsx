import type { AppProps } from "next/app";
import { createTheme, ThemeProvider } from "@mui/material";
import purple from "@mui/material/colors/purple";

import "../styles/globals.css";

const theme = createTheme({
  palette: {
    primary: purple,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          padding: "2em",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          marginTop: "1em",
        },
      },
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
