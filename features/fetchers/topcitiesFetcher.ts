import { ICityData } from "accu-weather-api-wrapper";

import { instance } from "features/axios";

const TOP_CITIES_COUNT = 2;
export const topcitiesFetcher = async (): Promise<ICityData[]> => {
  const response = await instance.get<ICityData[]>("locations/v1/topcities");
  return response.data.slice(0, TOP_CITIES_COUNT);
};
