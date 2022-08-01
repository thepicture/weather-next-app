import React, { FormEvent, useState } from "react";

import { NextPage } from "next";
import Head from "next/head";

import { Box, Card, Stack, Typography, Button, TextField } from "@mui/material";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";

import { createUserWithEmailAndPassword } from "firebase/auth";

import { auth } from "@features";
import { useRouter } from "next/router";
import Link from "next/link";

const EMAIL_IN_USE = "auth/email-already-in-use";

const RegistrationPage: NextPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const router = useRouter();
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        router.replace("/");
        alert("You have been registered!");
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === EMAIL_IN_USE) {
          alert("This email has been used!");
        } else {
          console.log(errorCode);
        }
      });
  };
  return (
    <div>
      <Head>
        <title>Create Account</title>
        <meta
          name="description"
          content="Create a new account to start using app"
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
              <AppRegistrationIcon sx={{ width: "100%" }} />
              <Typography component="h1" variant="h6" mb={2}>
                Create Account
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
              <TextField
                value={passwordAgain}
                onChange={(event) => setPasswordAgain(event.target.value)}
                type="password"
                placeholder="Repeat password"
              />
              <Button
                disabled={
                  !email ||
                  !password ||
                  !passwordAgain ||
                  password !== passwordAgain
                }
                type="submit"
                title="Sign up with a new account"
                variant="contained"
              >
                Register
              </Button>
              <Button
                onClick={() => router.push("/")}
                title="Sign up with a new account"
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

export default RegistrationPage;
