import React from "react";

import { useQuery } from "@tanstack/react-query";

import { ICityData } from "accu-weather-api-wrapper";

import { topcitiesFetcher } from "@features";
import { City } from "@components";

const TOPCITIES_DATA = ["topcitiesData"];
const STALE_TIME_IN_MILLISECONDS = 32 * 1000;

export const Topcities: React.FC = () => {
  const {
    isLoading,
    error,
    data: topcitiesData,
  } = useQuery<ICityData[], Error>(TOPCITIES_DATA, topcitiesFetcher, {
    staleTime: STALE_TIME_IN_MILLISECONDS,
  });

  if (isLoading) {
    return <p>Loading top cities...</p>;
  }

  if (error) {
    return (
      <>
        <p>An error has occured while loading top cities. {error.message}</p>
      </>
    );
  }

  return (
    <>
      {topcitiesData.map((city) => {
        return (
          <City
            key={city.Key}
            locationKey={city.Key}
            country={city.Country}
            geoPosition={city.GeoPosition}
          />
        );
      })}
    </>
  );
};
