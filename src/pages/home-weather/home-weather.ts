import {Component, OnInit} from "@angular/core";
import {NavController} from "ionic-angular";
import {UtilService, ForecastService, Forecast, DatabaseService, Metrics, DataPoint, Location} from "../providers";
import {WeatherDetailPage} from "../weather-detail/weather-detail";

@Component({
  selector: 'page-home-weather',
  templateUrl: 'home-weather.html'
})
export class HomeWeatherPage implements OnInit {
  forecast: Forecast;
  homeLocation: Location;
  metrics: Metrics;
  todayForecast: DataPoint;

  constructor(public navCtrl: NavController,
              public forecastService: ForecastService,
              public databaseService: DatabaseService,
              public utilService: UtilService) {
  }

  ngOnInit() {
    let self = this;
    this.databaseService.getJson('homeLocation')
      .then((data: Location)=> {
        console.debug('homeLocation > ' + JSON.stringify(data));
        self.homeLocation = data;
      })
      .then(()=> {
        return self.forecastService.get(self.homeLocation.lat, self.homeLocation.lng);
      })
      .then((data: Forecast)=> {
        self.forecast = data;
        if (self.forecast && self.forecast.daily && self.forecast.daily.data) {
          self.todayForecast = self.forecast.daily.data[0];
        }
      })
      .catch(err=> {
        console.error(err);
      });

    this.databaseService.getJson('metrics')
      .then((data: Metrics)=> {
        console.debug('metrics > ' + JSON.stringify(data));
        self.metrics = data;
      });
  }

  itemClicked(item: any) {
    console.debug('clicked weather item > ', item);
    this.navCtrl.push(WeatherDetailPage, {
      forecast: this.forecast,
      currentForecast: item,
      currentLocation: this.homeLocation,
      metrics: this.metrics
    });
  }
}
