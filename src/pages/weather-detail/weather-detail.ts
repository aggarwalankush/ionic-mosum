import {Component} from "@angular/core";
import {NavParams} from "ionic-angular";
import {UtilService, Forecast, DataPoint, Metrics, Location} from "../providers";

@Component({
  selector: 'page-weather-detail',
  templateUrl: 'weather-detail.html'
})
export class WeatherDetailPage {
  forecast: Forecast;
  currentForecast: DataPoint;
  currentLocation: Location;
  metrics: Metrics;

  constructor(public params: NavParams,
              public utilService: UtilService) {
    this.forecast = params.data.forecast;
    this.currentForecast = params.data.currentForecast;
    this.currentLocation = params.data.currentLocation;
    this.metrics = params.data.metrics;
  }
}
