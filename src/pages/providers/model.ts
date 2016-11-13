export interface Location {
  name: string,
  lat: number,
  lng: number
}

export interface Forecast {
  latitude: number,
  longitude: number,
  //IANA timezone
  timezone: string,
  hourly?: {
    data: Array<DataPoint>
  },
  daily?: {
    data: Array<DataPoint>
  }
}

export interface DataPoint {
  //Fahrenheit
  apparentTemperature?: number,
  apparentTemperatureMax?: number,
  apparentTemperatureMin?: number,
  //The percentage of sky occluded by clouds, between 0 and 1, inclusive
  cloudCover?: number,
  //Fahrenheit
  dewPoint?: number,
  //The relative humidity, between 0 and 1, inclusive.
  humidity?: number,
  icon?: string,
  //Dobson(DU)
  ozone?: number,
  //inches
  precipAccumulation?: number,
  //inches/h
  precipIntensity?: number,
  //The probability of precipitation occurring, between 0 and 1, inclusive.
  precipProbability?: number,
  // "rain", "snow", or "sleet"
  precipType?: string,
  //millibars
  pressure?: number,
  summary?: string,
  sunriseTime?: number,
  sunsetTime?: number,
  //Fahrenheit
  temperature?: number,
  temperatureMax?: number,
  temperatureMin?: number,
  time?: number,
  //miles
  visibility?: number,
  //degree
  windBearing?: number,
  //miles per hour
  windSpeed?: number
}

export interface Metrics {
  temp: MetricTemp,
  length: MetricLength,
  distance: MetricDistance,
  time: number,
  pressure: MetricPressure
}

export enum MetricTemp{
  F, C
}

export enum MetricLength{
  IN, CM
}

export enum MetricDistance{
  MI, KM
}

export enum MetricPressure{
  MBAR, HPA
}
