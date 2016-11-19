import {Component} from "@angular/core";
import {NavController, ModalController} from "ionic-angular";
import {Subscription} from "rxjs/Subscription";
import {
  DatabaseService,
  Location,
  ForecastService,
  UtilService,
  CONFIG,
  DEFAULT_METRICS,
  Forecast,
  DataPoint,
  Metrics
} from "../providers";
import {ModalLocation} from "../location/location";
import {WorldWeatherDetailPage} from "../world-weather-detail/world-weather-detail";
import * as _ from "lodash";

@Component({
  templateUrl: 'world-weather.html'
})
export class WorldWeatherPage {
  arrWorldWeather: Array<WorldWeather>;
  subscribers: Array<Subscription> = [];
  metrics: Metrics;

  constructor(public navCtrl: NavController,
              public databaseService: DatabaseService,
              public utilService: UtilService,
              public forecastService: ForecastService,
              public modalCtrl: ModalController) {
  }

  ionViewWillEnter() {
    let self = this;
    this.databaseService.getJson(CONFIG.METRICS).then(data=> {
      if (data === null) {
        self.databaseService.setJson(CONFIG.METRICS, DEFAULT_METRICS);
        self.metrics = DEFAULT_METRICS;
      } else {
        self.metrics = data;
      }
    });
    this.databaseService.getAllWorldLocations().then(locations=> {
      locations = _.sortBy(locations, ['name']);
      this.fillArray(locations);
    });
  }

  ionViewWillLeave() {
    _.forEach(this.subscribers, sub=>sub.unsubscribe());
  }

  fillArray(locations: Array<Location>) {
    let self = this;
    self.arrWorldWeather = [];
    _.forEach(locations, location=> {
      self.arrWorldWeather.push({
        location: location,
        firstDailyForecast: null,
        timezone: null
      });
    });
    _.forEach(locations, location=> {
      let sub = self.forecastService.getForecast(location, true)
        .subscribe((forecast: Forecast)=> {
          if (forecast && forecast.daily && forecast.daily.data) {
            _.map(self.arrWorldWeather, obj=> {
              if (obj.location === location) {
                obj.firstDailyForecast = forecast.daily.data[0];
                obj.timezone = forecast.timezone;
              }
            });
          }
        }, err=> {
          console.error(err);
        });
      self.subscribers.push(sub);
    });
  }

  addLocation() {
    let self = this;
    let modal = self.modalCtrl.create(ModalLocation, {heading: 'Add New City'});
    modal.onDidDismiss((data: Location) => {
      if (data) {
        self.databaseService.addWorldLocation(data).then(success=> {
          if (success) {
            let exists = _.find(self.arrWorldWeather, obj=> obj.location.name === data.name);
            if (exists) {
              self.utilService.showToast(data.name + " already exists");
            } else {
              self.arrWorldWeather.push({
                location: data,
                firstDailyForecast: null,
                timezone: null
              });
            }
          }
        });
      }
    });
    modal.present();
  }

  delete(location: Location) {
    let self = this;
    self.databaseService.removeWorldLocation(location.name).then(success=> {
      if (success) {
        _.remove(self.arrWorldWeather, obj=> obj.location.name === location.name);
      }
    })
  }

  locationClicked(location: Location) {
    this.navCtrl.push(WorldWeatherDetailPage, {location: location});
  }
}

export interface WorldWeather {
  location: Location;
  firstDailyForecast: DataPoint;
  timezone: string;
}
