import { IHourlyForecastData } from "accu-weather-api-wrapper";

import { instance } from "features/axios";

export const fetchHourlyForecastById = async (
  locationKey: string
): Promise<IHourlyForecastData> => {
  const response = await instance.get<IHourlyForecastData[]>(
    `forecasts/v1/hourly/1hour/${locationKey}`
  );
  return response.data[0];
};
