import React, { useContext, useEffect } from "react";

import { NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";

import { Button } from "@mui/material";
import { signOut } from "firebase/auth";

import { auth } from "@features";
import { Topcities } from "@components";
import { SnackbarContext } from "@contexts";

const WeatherPage: NextPage = () => {
  const router = useRouter();
  const { showSnackbar } = useContext(SnackbarContext);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
      showSnackbar("Cannot sign out, try again");
    }
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) router.replace("/login");
    });
  }, [auth.currentUser]);

  return (
    <>
      <Head>
        <title>Weather</title>
        <meta
          name="description"
          content="Explore weather information provided by AccuWeather"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Topcities />
      <Button onClick={handleSignOut}>Sign Out</Button>
    </>
  );
};

export default WeatherPage;
