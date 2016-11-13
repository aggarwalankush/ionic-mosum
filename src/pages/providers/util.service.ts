import {Injectable} from "@angular/core";
import {Metrics, MetricTemp, MetricLength, MetricDistance, MetricPressure} from "./model";
import moment from 'moment';
import * as _ from "lodash";
import "moment-timezone";

@Injectable()
export class UtilService {

  constructor() {
  }

  getStandardDay(epoch: number, tz: string): string {
    let pattern = 'dddd, MMM D';
    return epoch ? this.formatEpoch(epoch, pattern, tz) : null;
  }

  getCalendarDay(epoch: number, tz: string): string {
    if(!epoch) {
      return null;
    }
    return moment(epoch * 1000).tz(tz).calendar(null, {
      sameDay: '[Today], MMM D',
      nextDay: '[Tomorrow], MMM D',
      nextWeek: 'dddd, MMM D',
      lastDay: '[Yesterday], MMM D',
      lastWeek: '[Last] dddd, MMM D',
      sameElse: 'dddd, MMM D'
    });
  }

  getTime(epoch: number, metrics: Metrics, tz: string): string {
    let pattern = metrics.time === 24 ? 'HH:mm' : 'hh:mm A';
    return epoch ? this.formatEpoch(epoch, pattern, tz) : null;
  }

  formatEpoch(epoch: number, pattern: string, tz: string): string {
    return moment(epoch * 1000).tz(tz).format(pattern);
  }

  formatTemp(temp: number, metrics: Metrics): string {
    if (!temp) {
      return null;
    }
    if (metrics.temp === MetricTemp.C) {
      temp = (temp - 32) / 1.8;
    }
    return _.round(temp) + '\u00B0';
  }

  formatLength(length: number, metrics: Metrics): string {
    if (!length) {
      return null;
    }
    if (metrics.length === MetricLength.CM) {
      length = length * 2.54;
    }
    return _.round(length, 2) + ' ' + _.lowerCase(MetricLength[metrics.length]);
  }

  formatDistance(distance: number, metrics: Metrics): string {
    if (!distance) {
      return null;
    }
    if (metrics.distance === MetricDistance.KM) {
      distance = distance * 1.60934;
    }
    return _.round(distance, 2) + ' ' + _.lowerCase(MetricDistance[metrics.distance]);
  }

  formatPressure(pressure: number, metrics: Metrics): string {
    if (!pressure) {
      return null;
    }
    let unit = 'mbar';
    if (metrics.pressure === MetricPressure.HPA) {
      unit = 'hPa';
    }
    return _.round(pressure, 2) + ' ' + unit;
  }

  formatWind(windSpeed: number, windDegree: number, metrics: Metrics): string {
    if (!windSpeed) {
      return null;
    }
    if (metrics.distance === MetricDistance.KM) {
      windSpeed = windSpeed * 1.60934;
    }
    return _.round(windSpeed, 2) + ' ' + _.lowerCase(MetricDistance[metrics.distance]) + '/h ' + this.degToCard(windDegree);
  }

  formatPI(pi: number, metrics: Metrics): string {
    if (!pi) {
      return null;
    }
    if (metrics.length === MetricLength.CM) {
      pi = pi * 25.4;
    }
    return _.round(pi, 2) + ' mm/h';
  }

  getWeatherIcon(icon: string): string {
    return 'assets/img/' + icon + '.png';
  }

  getDefaultIcon(): string {
    return 'assets/img/default-weather.png';
  }

  degToCard(deg: number): string {
    if (deg > 11.25 && deg < 33.75) {
      return "NNE";
    } else if (deg > 33.75 && deg < 56.25) {
      return "ENE";
    } else if (deg > 56.25 && deg < 78.75) {
      return "E";
    } else if (deg > 78.75 && deg < 101.25) {
      return "ESE";
    } else if (deg > 101.25 && deg < 123.75) {
      return "ESE";
    } else if (deg > 123.75 && deg < 146.25) {
      return "SE";
    } else if (deg > 146.25 && deg < 168.75) {
      return "SSE";
    } else if (deg > 168.75 && deg < 191.25) {
      return "S";
    } else if (deg > 191.25 && deg < 213.75) {
      return "SSW";
    } else if (deg > 213.75 && deg < 236.25) {
      return "SW";
    } else if (deg > 236.25 && deg < 258.75) {
      return "WSW";
    } else if (deg > 258.75 && deg < 281.25) {
      return "W";
    } else if (deg > 281.25 && deg < 303.75) {
      return "WNW";
    } else if (deg > 303.75 && deg < 326.25) {
      return "NW";
    } else if (deg > 326.25 && deg < 348.75) {
      return "NNW";
    } else {
      return "N";
    }
  }

  uppercase(text:string):string{
    return _.upperCase(text);
  }

}
