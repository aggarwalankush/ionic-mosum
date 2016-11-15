import {MetricPressure, MetricDistance, MetricLength, MetricTemp} from "./model";

export const DEFAULT_METRICS = {
  temp: MetricTemp.F,
  length: MetricLength.IN,
  distance: MetricDistance.MI,
  time: 12,
  pressure: MetricPressure.MBAR
};

export const FORECAST_CONFIG = {
  API_ENDPOINT: 'https://api.darksky.net/forecast/',
  API_KEY: '9bb59ff3063ac4930fc96890570b0c6f'
};

export const HOME_CONFIG = {
  FORECAST: 'homeForecast',
  LOCATION: 'homeLocation',
  LAST_UPDATED: 'homeLastUpdated'
};

export const CONFIG = {
  METRICS: 'metrics'
};
