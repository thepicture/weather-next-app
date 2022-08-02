import React from "react";

import Image from "next/image";

import { IBaseCityData, IHourlyForecastData } from "accu-weather-api-wrapper";

import { Map } from "pigeon-maps";

import { Card, Typography } from "@mui/material";

import { useQuery } from "@tanstack/react-query";

import { fetchHourlyForecastById } from "@features";

export interface CityProps {
  locationKey: string;
  country: IBaseCityData["Country"];
  geoPosition: IBaseCityData["GeoPosition"];
}

const HOURY_FORECAST_DATA = "hourly";
const STALE_TIME_IN_MILLISECONDS = 1000 * 60 * 60;

export const City: React.FC<CityProps> = ({
  locationKey,
  country,
  geoPosition,
}) => {
  const {
    isLoading,
    error,
    data: hourlyForecastData,
  } = useQuery<IHourlyForecastData, Error>(
    [HOURY_FORECAST_DATA, locationKey],
    () => fetchHourlyForecastById(locationKey),
    {
      staleTime: STALE_TIME_IN_MILLISECONDS,
    }
  );

  if (isLoading) {
    return <p>Loading hourly forecast...</p>;
  }

  if (error) {
    return (
      <>
        <p>
          An error has occured while loading hourly forecast. {error.message}
        </p>
      </>
    );
  }

  return (
    <Card sx={{ textAlign: "center", m: 6 }}>
      <Typography component="h1" variant="h5" textAlign="start">
        {country.EnglishName}
      </Typography>
      <Image
        src={`https://developer.accuweather.com/sites/default/files/${
          (+hourlyForecastData.WeatherIcon < 10 ? "0" : "") +
          hourlyForecastData.WeatherIcon
        }-s.png`}
        width="100"
        height="100"
        objectFit="contain"
      />
      <Typography>
        {hourlyForecastData.Temperature.Value +
          " " +
          hourlyForecastData.Temperature.Unit}
      </Typography>
      <Map
        defaultCenter={[geoPosition.Latitude, geoPosition.Longitude]}
        defaultZoom={11}
        mouseEvents={false}
        touchEvents={false}
        height={300}
      />
    </Card>
  );
};
