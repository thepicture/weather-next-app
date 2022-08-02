import { ICityData } from "accu-weather-api-wrapper";

import { instance } from "features/axios";

export const topcitiesFetcher = (): Promise<ICityData[]> => {
  return instance
    .get<ICityData[]>("topcities")
    .then((response) => response.data);
};
