import { Box, Button, Card, Stack, Typography } from "@mui/material";
import CloudIcon from "@mui/icons-material/Cloud";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Weather App</title>
        <meta
          name="description"
          content="A weather app powered by AccuWeather"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        m={2}
      >
        <Card component="main" sx={{ width: "100%", maxWidth: "500px" }}>
          <Stack textAlign="center">
            <CloudIcon sx={{ width: "100%" }} />
            <Typography component="h1" variant="h6" mb={2}>
              Weather App
            </Typography>
            <Link href="/login">
              <Button
                title="Sign in with the existing account"
                variant="contained"
              >
                Login
              </Button>
            </Link>
            <Link href="/register">
              <Button title="Sign up with a new account">Register</Button>
            </Link>
          </Stack>
        </Card>
      </Box>
    </div>
  );
};

export default Home;
