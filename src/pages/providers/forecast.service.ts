import {Injectable, EventEmitter} from "@angular/core";
import {Response, Jsonp} from "@angular/http";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import {Forecast} from "./model";
import {DatabaseService} from "./database.service";
import {FORECAST_CONFIG, HOME_CONFIG} from "./constants";

@Injectable()
export class ForecastService {
  private apiUnits: string = 'us';
  private apiLanguage: string = 'en';
  refreshThreshold = 6 * 60 * 60 * 1000; //6 hours

  constructor(public jsonp: Jsonp,
              public databaseService: DatabaseService) {
  }

  getHomeForecast(lat: number, lng: number): Observable<Forecast> {
    let self = this;
    let forecastData: EventEmitter<Forecast> = new EventEmitter<Forecast>();
    self.databaseService.get(HOME_CONFIG.LAST_UPDATED).then(lastUpdated=> {
      if (lastUpdated && Date.now() - +lastUpdated < self.refreshThreshold) {
        console.debug('getting forecast data from DATABASE');
        self.databaseService.getJson(HOME_CONFIG.FORECAST).then(homeForecast=> {
          if (homeForecast) {
            forecastData.emit(homeForecast)
          } else {
            self.getServerData(lat, lng, forecastData);
          }
        });
      } else {
        self.getServerData(lat, lng, forecastData);
      }
    });
    return forecastData;
  }

  private getServerData(lat: number, lng: number, forecastData: EventEmitter<Forecast>) {
    console.debug('getting forecast data from SERVER');
    let self = this;
    self.jsonp.get(self.getRequestUri(lat, lng, 'currently,minutely,alerts,flags'))
      .map(self.extractData)
      .catch(self.handleError)
      .subscribe(data=> {
        forecastData.emit(data);
        self.databaseService.setJson(HOME_CONFIG.FORECAST, data);
        self.databaseService.set(HOME_CONFIG.LAST_UPDATED, Date.now() + '');
      });
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || {};
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

  private getRequestUri(lat: number, lng: number, exclude: string): string {
    return [
      FORECAST_CONFIG.API_ENDPOINT, FORECAST_CONFIG.API_KEY, '/',
      lat, ',', lng,
      '?units=', this.apiUnits,
      '&lang=', this.apiLanguage,
      '&exclude=', exclude,
      '&callback=JSONP_CALLBACK'
    ].join('');
  }
}
