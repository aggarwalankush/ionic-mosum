import {Injectable, EventEmitter} from "@angular/core";
import {Response, Jsonp} from "@angular/http";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import {Forecast} from "./model";
import {DatabaseService} from "./database.service";

@Injectable()
export class ForecastService {
  private API_ENDPOINT: string = 'https://api.darksky.net/forecast/';
  private apiKey: string = '9bb59ff3063ac4930fc96890570b0c6f';
  private apiUnits: string = 'us';
  private apiLanguage: string = 'en';
  refreshThreshold = 6 * 60 * 60 * 1000; //6 hours

  constructor(public jsonp: Jsonp,
              public databaseService: DatabaseService) {
  }

  get(lat: number, lng: number): Observable<Forecast> {
    let self = this;
    let forecastData: EventEmitter<Forecast> = new EventEmitter<Forecast>();
    self.databaseService.get('lastUpdated')
      .then(lastUpdated=> {
        if (lastUpdated && Date.now() - +lastUpdated < self.refreshThreshold) {
          console.debug('getting database data');
          self.databaseService.getJson('homeWeather')
            .then(homeWeather=> forecastData.emit(homeWeather));
        } else {
          console.debug('getting server data');
          self.jsonp.get(self.getRequestUri(lat, lng, 'currently,minutely,alerts,flags'))
            .map(self.extractData)
            .catch(self.handleError)
            .subscribe(data=> {
              forecastData.emit(data);
              self.databaseService.setJson('homeWeather', data);
              self.databaseService.set('lastUpdated', Date.now() + '');
            });
        }
      });
    return forecastData;
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
      this.API_ENDPOINT, this.apiKey, '/',
      lat, ',', lng,
      '?units=', this.apiUnits,
      '&lang=', this.apiLanguage,
      '&exclude=', exclude,
      '&callback=JSONP_CALLBACK'
    ].join('');
  }
}
