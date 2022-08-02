import React from "react";

import { IBaseCityData } from "accu-weather-api-wrapper";

import { Map } from "pigeon-maps";

import { Card, Typography } from "@mui/material";

export interface CityProps {
  country: IBaseCityData["Country"];
  geoPosition: IBaseCityData["GeoPosition"];
}

export const City: React.FC<CityProps> = ({ country, geoPosition }) => {
  return (
    <Card sx={{ m: 6 }}>
      <Typography component="h1" variant="h5">
        {country.EnglishName}
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
