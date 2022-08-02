import React, { FormEvent, useContext, useState } from "react";

import { NextPage } from "next";
import Head from "next/head";

import { Box, Card, Stack, Typography, Button, TextField } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";

import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "@features";
import { useRouter } from "next/router";

import { SnackbarContext } from "@contexts";

const NOT_FOUND = "auth/user-not-found";
const WRONG_PASSWORD = "auth/wrong-password";

const LoginPage: NextPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { showSnackbar } = useContext(SnackbarContext);
  const router = useRouter();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        showSnackbar("Signed in successfully!");
        router.replace("/weather");
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === NOT_FOUND)
          showSnackbar("Entered email is not related to any account");
        else if (errorCode === WRONG_PASSWORD)
          showSnackbar("Incorrect password");
        else console.log(errorCode);
      });
  };

  return (
    <div>
      <Head>
        <title>Login</title>
        <meta
          name="description"
          content="Enter credentials to sign in on the site"
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
          <form onSubmit={handleSubmit}>
            <Stack textAlign="center">
              <LoginIcon sx={{ width: "100%" }} />
              <Typography component="h1" variant="h6" mb={2}>
                Login
              </Typography>
              <TextField
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                type="email"
                placeholder="Email"
              />
              <TextField
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                type="password"
                placeholder="Password"
              />
              <Button
                type="submit"
                title="Sign in with entered credentials"
                variant="contained"
              >
                Login
              </Button>
              <Button
                onClick={() => router.push("/")}
                title="Navigate to home page as a guest"
              >
                Back
              </Button>
            </Stack>
          </form>
        </Card>
      </Box>
    </div>
  );
};

export default LoginPage;
