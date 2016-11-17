import {Component} from "@angular/core";
import {NavController, ModalController} from "ionic-angular";
import {
  UtilService,
  ForecastService,
  Forecast,
  DatabaseService,
  Metrics,
  DataPoint,
  Location,
  DEFAULT_METRICS,
  CONFIG
} from "../providers";
import {WeatherDetailPage} from "../weather-detail/weather-detail";
import {ModalLocation} from "../location/location";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'page-home-weather',
  templateUrl: 'home-weather.html'
})
export class HomeWeatherPage {
  forecast: Forecast;
  homeLocation: Location;
  metrics: Metrics;
  todayForecast: DataPoint;
  forecastSubscriber: Subscription;

  constructor(public navCtrl: NavController,
              public forecastService: ForecastService,
              public databaseService: DatabaseService,
              public modalCtrl: ModalController,
              public utilService: UtilService) {
  }

  itemClicked(item: any) {
    this.navCtrl.push(WeatherDetailPage, {
      forecast: this.forecast,
      currentForecast: item,
      currentLocation: this.homeLocation,
      metrics: this.metrics
    });
  }

  ionViewWillEnter() {
    let self = this;
    this.databaseService.getJson(CONFIG.HOME_LOCATION).then(data=> {
      if (data === null) {
        let modal = self.modalCtrl.create(ModalLocation, {heading: 'Enter Home City', showCancel: false});
        modal.onDidDismiss((data: Location) => {
          console.debug('page > modal dismissed > data > ', data);
          if (data) {
            self.databaseService.setJson(CONFIG.HOME_LOCATION, data);
            self.getForecast(data);
          }
        });
        modal.present();
      } else {
        self.getForecast(data);
      }
    });
    this.databaseService.getJson(CONFIG.METRICS).then(data=> {
      if (data === null) {
        self.databaseService.setJson(CONFIG.METRICS, DEFAULT_METRICS);
        self.metrics = DEFAULT_METRICS;
      } else {
        self.metrics = data;
      }
    });
  }

  getForecast(homeLocation: Location) {
    let self = this;
    this.homeLocation = homeLocation;
    this.forecastSubscriber = self.forecastService.getForecast(homeLocation)
      .subscribe((data: Forecast)=> {
        self.forecast = data;
        if (self.forecast && self.forecast.daily && self.forecast.daily.data) {
          self.todayForecast = self.forecast.daily.data[0];
        }
      }, err=> {
        console.error(err);
      });
  }

  ionViewWillLeave() {
    if (this.forecastSubscriber) {
      this.forecastSubscriber.unsubscribe();
    }
  }
}
