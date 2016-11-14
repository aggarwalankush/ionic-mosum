import {Component, OnInit} from "@angular/core";
import {NavController, ModalController} from "ionic-angular";
import {
  UtilService,
  ForecastService,
  Forecast,
  DatabaseService,
  Metrics,
  DataPoint,
  Location,
  DEFAULT_METRICS
} from "../providers";
import {WeatherDetailPage} from "../weather-detail/weather-detail";
import {ModalLocation} from "../location/location";

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
              public modalCtrl: ModalController,
              public utilService: UtilService) {
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

  ngOnInit() {
    let self = this;
    this.databaseService.getJson('homeLocation').then(data=> {
      if (data === null) {
        let modal = self.modalCtrl.create(ModalLocation, {heading: 'Enter Home City Name'});
        modal.onDidDismiss((data: Location) => {
          console.debug('page > modal dismissed > data > ', data);
          self.databaseService.setJson('homeLocation', data);
          self.homeLocation = data;
          self.getForecast();
        });
        modal.present();
      } else {
        self.homeLocation = data;
        self.getForecast();
      }
    });
    this.databaseService.getJson('metrics').then(data=> {
      if (data === null) {
        self.databaseService.setJson('metrics', DEFAULT_METRICS);
        self.metrics = DEFAULT_METRICS;
      } else {
        self.metrics = data;
      }
    });
  }

  getForecast() {
    let self = this;
    self.forecastService.get(self.homeLocation.lat, self.homeLocation.lng)
      .then((data: Forecast)=> {
        self.forecast = data;
        if (self.forecast && self.forecast.daily && self.forecast.daily.data) {
          self.todayForecast = self.forecast.daily.data[0];
        }
      })
      .catch(err=> {
        console.error(err);
      });
  }
}
