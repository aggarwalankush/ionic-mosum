import {Component, OnInit, style, state, animate, transition, trigger} from "@angular/core";
import {NavParams} from "ionic-angular";
import {UtilService, Forecast, DataPoint, Metrics, Location, KV} from "../providers";
import * as _ from "lodash";

@Component({
  selector: 'page-weather-detail',
  templateUrl: 'weather-detail.html',
  animations: [
    trigger('collapseExpand', [
      state('default', style({height: '*'})),
      transition('* => void', [
        style({height: '*'}),
        animate(100, style({height: 0}))
      ]),
      transition('void => *', [
        style({height: 0}),
        animate(100, style({height: '*'}))
      ])
    ])
  ]
})
export class WeatherDetailPage implements OnInit {
  forecast: Forecast;
  currentForecast: DataPoint;
  currentLocation: Location;
  metrics: Metrics;
  detailsElem: Array<string> = ['humidity', 'pressure', 'windSpeed', 'ozone',
    'dewPoint', 'cloudCover', 'visibility', 'precipType',
    'precipIntensity', 'precipProbability', 'precipAccumulation'];
  detailsArray: Array<KV> = [];
  showSegment: boolean = false;
  whichSegment: string = 'detail';
  hourlyArray: Array<{
    time: number,
    icon: string,
    temperature: number,
    showDetails: boolean,
    details: Array<KV>
  }> = [];
  firstHourlyObj: DataPoint;

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
      this.firstHourlyObj = _.find(this.forecast.hourly.data, obj=> self.currentForecast.time <= obj.time);
      this.showSegment = !!this.firstHourlyObj;
    } catch (err) {
      this.showSegment = false;
    }
    this.detailsArray = this.getDetailsArray(this.currentForecast);
    console.debug('Details Array > ' + JSON.stringify(this.detailsArray));
  }

  ionViewDidLoad() {
    let self = this;
    this.hourlyArray = [];
    if (this.showSegment && this.firstHourlyObj) {
      _.forEach(self.forecast.hourly.data, (obj: DataPoint)=> {
        if (obj.time < self.firstHourlyObj.time) {
          return;
        }
        self.hourlyArray.push({
          time: obj.time,
          icon: obj.icon,
          temperature: obj.temperature,
          showDetails: false,
          details: self.getDetailsArray(obj)
        });
      });
    }
  }


  toggleDetails(item) {
    item.showDetails = !item.showDetails;
  }

  getDetailsArray(dp: DataPoint): Array<KV> {
    let self = this;
    let detailsArray = [];
    _.forEach(this.detailsElem, (elem)=> {
      let elemVal = _.get(dp, elem, 0);
      if (elemVal !== 0) {
        let value = self.formatDetailElem(elem, elemVal);
        detailsArray.push({key: _.startCase(elem), value: value});
      }
    });
    return detailsArray;
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
        return this.utilService.startCase(elemVal);
      case 'precipIntensity':
        return this.utilService.formatPI(elemVal, this.metrics);
      case 'precipAccumulation':
        return this.utilService.formatLength(elemVal, this.metrics);
      default:
        return elemVal + '';
    }
  }
}
