import {Component, OnInit} from "@angular/core";
import {NavParams} from "ionic-angular";
import {UtilService, Forecast, DataPoint, Metrics, Location} from "../providers";
import * as _ from "lodash";

@Component({
  selector: 'page-weather-detail',
  templateUrl: 'weather-detail.html'
})
export class WeatherDetailPage implements OnInit {
  forecast: Forecast;
  currentForecast: DataPoint;
  currentLocation: Location;
  metrics: Metrics;
  detailsElem: Array<string> = ['humidity', 'pressure', 'windSpeed', 'ozone',
    'dewPoint', 'cloudCover', 'visibility', 'precipType',
    'precipIntensity', 'precipProbability', 'precipAccumulation'];
  detailsArray: Array<{name: string,value: string}> = [];
  showSegment: boolean = false;
  whichSegment: string = 'detail';

  constructor(public params: NavParams,
              public utilService: UtilService) {
    this.forecast = params.data.forecast;
    this.currentForecast = params.data.currentForecast;
    this.currentLocation = params.data.currentLocation;
    this.metrics = params.data.metrics;
  }

  ngOnInit() {
    let self = this;
    try {
      this.showSegment = this.currentForecast.time < this.forecast.hourly.data[0].time;
    } catch (err) {
      this.showSegment = false;
    }
    this.detailsArray = [];
    _.forEach(this.detailsElem, (elem)=> {
      let elemVal = _.get(self.currentForecast, elem, 0);
      if (elemVal !== 0) {
        let value = self.formatDetailElem(elem, elemVal);
        self.detailsArray.push({name: _.startCase(elem), value: value});
      }
    });
    console.debug(JSON.stringify(this.detailsArray));
  }

  formatDetailElem(detailElem: string, elemVal: any): string {
    switch (detailElem) {
      case 'humidity':
      case 'cloudCover':
      case 'precipProbability':
        return _.round(elemVal * 100, 5) + ' %';
      case 'pressure':
        return this.utilService.formatPressure(elemVal, this.metrics);
      case 'windSpeed':
        let windBearing = this.currentForecast.windBearing;
        return this.utilService.formatWind(elemVal, windBearing, this.metrics);
      case 'ozone':
        return elemVal + ' DU';
      case 'dewPoint':
        return this.utilService.formatTemp(elemVal, this.metrics);
      case 'visibility':
        return this.utilService.formatDistance(elemVal, this.metrics);
      case 'precipType':
        return elemVal;
      case 'precipIntensity':
        return this.utilService.formatPI(elemVal, this.metrics);
      case 'precipAccumulation':
        return this.utilService.formatLength(elemVal, this.metrics);
      default:
        return elemVal + '';
    }
  }

  segmentChanged() {

  }
}
