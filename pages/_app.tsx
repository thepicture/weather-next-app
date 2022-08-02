import { useState } from "react";
import { useEffect } from "react";

import type { AppProps } from "next/app";

import { createTheme, Snackbar, ThemeProvider } from "@mui/material";
import { purple } from "@mui/material/colors";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { SnackbarContext } from "@contexts";
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
    MuiTextField: {
      styleOverrides: {
        root: {
          marginTop: "1em",
        },
      },
    },
  },
});

const SNACKBAR_AUTOHIDE_DURATION_MILLISECONDS = 3200;

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  const [message, setMessage] = useState("");
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  useEffect(() => {
    setIsSnackbarOpen(true);
  }, [message]);

  const showSnackbar = (message: string) => {
    setMessage(message);
    setIsSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setIsSnackbarOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <SnackbarContext.Provider value={{ showSnackbar }}>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
          <Snackbar
            open={isSnackbarOpen}
            onClose={handleSnackbarClose}
            autoHideDuration={SNACKBAR_AUTOHIDE_DURATION_MILLISECONDS}
            message={message}
          />
        </QueryClientProvider>
      </SnackbarContext.Provider>
    </ThemeProvider>
  );
}

export default MyApp;
