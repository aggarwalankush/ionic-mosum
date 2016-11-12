import {Injectable} from "@angular/core";
import * as moment from "moment";
import {DatabaseService} from "./database.service";

@Injectable()
export class UtilService {

  constructor(public databaseService: DatabaseService) {

  }

  getMetric(): Promise<string> {
    return this.databaseService.get('metric').then(metric=> metric ? metric : 'F');
  }

  getTimeFormat(): Promise<string> {
    return this.databaseService.get('timeFormat').then(timeFormat=> timeFormat ? timeFormat : '12');
  }

  getLocation(): Promise<string> {
    return this.databaseService.get('location').then(location=> location ? location : '95134');
  }

  formatTemp(temp: number, metric: string): string {
    if (!temp) {
      return null;
    }
    if (metric === 'F') {
      temp = (temp * 1.8) + 32;
    }
    return Math.round(temp) + '\u00B0' + metric;
  }

  getMediumDayString(epoch: number, timeFormat: string): string {
    return epoch ? moment.unix(epoch).format('ddd, MMM D') + ' ' + this.getTimeString(epoch, timeFormat) : null;
  }

  getFullDayString(epoch: number, timeFormat: string): string {
    return epoch ? moment.unix(epoch).format('dddd, MMMM D') + ' ' + this.getTimeString(epoch, timeFormat) : null;
  }

  getTodayString(epoch: number, timeFormat: string): string {
    return epoch ? 'Today, ' + moment.unix(epoch).format('MMMM D') : null;
  }

  getTimeString(epoch: number, timeFormat: string): string {
    let pattern = 'hh:mm A';
    if (timeFormat === '24') {
      pattern = 'HH:mm';
    }
    return epoch ? moment.unix(epoch).format(pattern) : null;
  }

  getWeatherIcon(weatherObj: any, epoch: number): string {
    let weatherId: number = weatherObj.id;
    let iconSrc = 'assets/img/weather';
    const hour = moment.unix(epoch).get('hour');
    if (hour >= 18 || hour <= 6) {
      iconSrc += '/night';
    } else {
      iconSrc += '/day';
    }
    if (weatherId >= 200 && weatherId <= 232) {
      return iconSrc + '/storm.png';
    } else if (weatherId >= 300 && weatherId <= 321) {
      return iconSrc + '/drizzle.png';
    } else if (weatherId >= 500 && weatherId <= 504) {
      return iconSrc + '/rain.png';
    } else if (weatherId == 511) {
      return iconSrc + '/snow.png';
    } else if (weatherId >= 520 && weatherId <= 531) {
      return iconSrc + '/rain.png';
    } else if (weatherId >= 600 && weatherId <= 622) {
      return iconSrc + '/snow.png';
    } else if (weatherId >= 701 && weatherId <= 761) {
      return iconSrc + '/fog.png';
    } else if (weatherId == 761 || weatherId == 781) {
      return iconSrc + '/storm.png';
    } else if (weatherId == 800) {
      return iconSrc + '/clear.png';
    } else if (weatherId >= 801 && weatherId <= 804) {
      return iconSrc + '/cloud.png';
    }
    return 'http://openweathermap.org/img/w/' + weatherObj.icon + '.png';
  }

  getFormattedWind(windSpeed: number, degrees: number): string {
    let windFormat: string = 'km/h';
    this.getMetric().then(metric=> {
      if (metric === 'F') {
        windFormat = 'mph';
        windSpeed = 0.621371192237334 * windSpeed;
      }
    });

    let direction: string = "Unknown";
    if (degrees >= 337.5 || degrees < 22.5) {
      direction = "N";
    } else if (degrees >= 22.5 && degrees < 67.5) {
      direction = "NE";
    } else if (degrees >= 67.5 && degrees < 112.5) {
      direction = "E";
    } else if (degrees >= 112.5 && degrees < 157.5) {
      direction = "SE";
    } else if (degrees >= 157.5 && degrees < 202.5) {
      direction = "S";
    } else if (degrees >= 202.5 && degrees < 247.5) {
      direction = "SW";
    } else if (degrees >= 247.5 && degrees < 292.5) {
      direction = "W";
    } else if (degrees >= 292.5 && degrees < 337.5) {
      direction = "NW";
    }
    return this.roundVal(windSpeed) + ' ' + windFormat + ' ' + direction;
  }

  roundVal(val: number): number {
    return Math.round(val);
  }
}
