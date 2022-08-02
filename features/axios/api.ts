import axios from "axios";

const BASE_URL = "http://dataservice.accuweather.com/locations/v1/";
const TIMEOUT_IN_MILLISECONDS = 4 * 1000;

const DEFAULT_LANGUAGE = "en-us";
const params = new URLSearchParams({
  apikey: process.env.NEXT_PUBLIC_WEATHER_API_KEY!,
  language: DEFAULT_LANGUAGE,
  details: String(false),
});

export const instance = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT_IN_MILLISECONDS,
  params,
});
