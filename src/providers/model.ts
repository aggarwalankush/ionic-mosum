import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';

export interface Location {
  name: string;
  lat: number;
  lng: number;
}

export interface KV {
  key: string;
  value: string;
}

export interface Forecast {
  latitude: number;
  longitude: number;
  //IANA timezone
  timezone: string;
  hourly?: {
    data: Array<DataPoint>
  };
  daily?: {
    data: Array<DataPoint>
  };
}

export interface DataPoint {
  //Fahrenheit
  apparentTemperature?: number;
  apparentTemperatureMax?: number;
  apparentTemperatureMin?: number;
  //The percentage of sky occluded by clouds, between 0 and 1, inclusive
  cloudCover?: number;
  //Fahrenheit
  dewPoint?: number;
  //The relative humidity, between 0 and 1, inclusive.
  humidity?: number;
  icon?: string;
  //Dobson(DU)
  ozone?: number;
  //inches
  precipAccumulation?: number;
  //inches/h
  precipIntensity?: number;
  //The probability of precipitation occurring, between 0 and 1, inclusive.
  precipProbability?: number;
  // "rain", "snow", or "sleet"
  precipType?: string;
  //millibars
  pressure?: number;
  summary?: string;
  sunriseTime?: number;
  sunsetTime?: number;
  //Fahrenheit
  temperature?: number;
  temperatureMax?: number;
  temperatureMin?: number;
  time?: number;
  //miles
  visibility?: number;
  //degree
  windBearing?: number;
  //miles per hour
  windSpeed?: number;
}

export interface Metrics {
  temp: MetricTemp;
  length: MetricLength;
  distance: MetricDistance;
  time: number;
  pressure: MetricPressure;
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

export interface PageInterface {
  title: string;
  name: any;
  icon: string;
  index?: number;
  tabName?: any;
}

//https://github.com/FuelInteractive/fuel-ui/tree/master/src/animations/Collapse
export function collapse(duration: number = 200) {
  return trigger('collapse', [
    state('collapsed, true, void', style({
      height: '0',
      opacity: '0',
      overflow: 'hidden'
    })),
    state('expanded, false', style({
      height: '*',
      opacity: '1',
      overflow: 'hidden'
    })),
    transition('true => false, collapsed => expanded', [
      animate(duration + 'ms ease', keyframes([
        style({ opacity: '1' }),
        style({ height: '*' })
      ]))
    ]),
    transition('false => true, expanded => collapsed', [
      animate(duration + 'ms ease', style({ height: '0' }))
    ])
  ]);
}
