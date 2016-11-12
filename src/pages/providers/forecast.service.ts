import {Injectable} from "@angular/core";
import {Http, Response, Jsonp} from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/toPromise";

@Injectable()
export class ForecastService {
  private API_ENDPOINT: string = 'https://api.darksky.net/forecast/';
  private apiKey: string = '9bb59ff3063ac4930fc96890570b0c6f';
  private apiUnits: string = 'us';
  private apiLanguage: string = 'en';

  constructor(public http: Http, public jsonp: Jsonp) {
  }

  get(lat: number, lng: number): Promise<any> {
    // return this.jsonp.get(this.getRequestUri(lat, lng, 'currently,minutely,alerts,flags'))
    //   .map(this.extractData)
    //   .toPromise()
    //   .catch(this.handleError);

    //TODO
    return this.http.get('assets/sampleData.json')
      .map(this.extractData)
      .toPromise()
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
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
