import { EventEmitter, Injectable } from '@angular/core';
import { Jsonp, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Forecast, Location } from './model';
import { DatabaseService } from './database.service';
import { FORECAST_CONFIG, REFRESH_THRESHOLD } from './constants';
import * as _ from 'lodash';

@Injectable()
export class ForecastService {

  constructor(public jsonp: Jsonp,
              public databaseService: DatabaseService) {
  }

  getForecast(location: Location, cacheOnly: boolean = false): Observable<Forecast> {
    let self = this;
    let emitterForecast: EventEmitter<Forecast> = new EventEmitter<Forecast>();
    self.databaseService.getForecast(location.name)
      .then(data => {
        if (_.isEmpty(data) || !data.lastUpdated || _.isEmpty(data.forecast)) {
          throw new Error('Invalid database forecast, fallback to server > ' + location.name);
        } else {
          console.debug('getting forecast data from DATABASE');
          emitterForecast.emit(data.forecast);
          if (Date.now() - data.lastUpdated > REFRESH_THRESHOLD) {
            throw new Error('Outdated database forecast, refreshing from server > ' + location.name);
          }
        }
      })
      .catch(err => {
        if (err && err.message) {
          console.error(err.message);
        }
        if (cacheOnly) {
          console.debug('Cache only flag > not refreshing from server > ' + location.name);
        } else {
          self.getServerData(location, emitterForecast);
        }
      });
    return emitterForecast;
  }

  private getServerData(location: Location, emitterForecast: EventEmitter<Forecast>) {
    console.debug('getting forecast data from SERVER');
    let self = this;
    self.jsonp.get(self.getRequestUri(location))
      .map(res => res.json())
      .catch(self.handleError)
      .subscribe(data => {
        emitterForecast.emit(data);
        self.databaseService.addForecast(location.name, data);
      });
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  private getRequestUri(location: Location): string {
    return FORECAST_CONFIG.API_ENDPOINT + FORECAST_CONFIG.API_KEY + '/' + location.lat + ',' + location.lng
      + '?units=us&lang=en&exclude=currently,minutely,alerts,flags&callback=JSONP_CALLBACK';
  }
}
