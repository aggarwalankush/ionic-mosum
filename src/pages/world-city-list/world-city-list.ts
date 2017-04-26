import { Component, OnInit } from '@angular/core';
import { IonicPage, ModalController, NavController } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';
import {
  CONFIG,
  DatabaseService,
  DataPoint,
  DEFAULT_METRICS,
  Forecast,
  ForecastService,
  Location,
  Metrics,
  UtilService
} from '../../providers';
import * as _ from 'lodash';

@IonicPage()
@Component({
  selector: 'page-world-city-list',
  templateUrl: 'world-city-list.html'
})
export class WorldCityListPage implements OnInit {
  arrWorldWeather: Array<WorldWeather>;
  subscribers: Array<Subscription>;
  metrics: Metrics;

  constructor(public navCtrl: NavController,
              public databaseService: DatabaseService,
              public utilService: UtilService,
              public forecastService: ForecastService,
              public modalCtrl: ModalController) {
  }

  ngOnInit() {
    let self = this;
    self.arrWorldWeather = [];
    self.subscribers = [];
    self.databaseService.get('stopDeleteAnimation').then(stop => {
      self.databaseService.getAllWorldLocations().then(locations => {
        _.forEach(locations, (location, index) => {
          self.arrWorldWeather.push({
            location: location,
            firstDailyForecast: null,
            timezone: null,
            shouldAnimate: stop ? false : index === 0
          });
        });
        self.updateForecast();
      });
    });
  }

  ionViewWillEnter() {
    let self = this;
    this.databaseService.getJson(CONFIG.METRICS).then(data => {
      if (data === null) {
        self.databaseService.setJson(CONFIG.METRICS, DEFAULT_METRICS);
        self.metrics = DEFAULT_METRICS;
      } else {
        self.metrics = data;
      }
    });
    self.updateForecast();
  }

  ionViewWillLeave() {
    _.forEach(this.subscribers, sub => sub.unsubscribe());
  }

  updateForecast() {
    let self = this;
    _.forEach(self.arrWorldWeather, wwObj => {
      let sub = self.forecastService.getForecast(wwObj.location, true)
        .subscribe((forecast: Forecast) => {
          if (forecast && forecast.daily && forecast.daily.data) {
            wwObj.firstDailyForecast = forecast.daily.data[0];
            wwObj.timezone = forecast.timezone;
          }
        }, err => {
          console.error(err);
        });
      self.subscribers.push(sub);
    });
  }

  addLocation() {
    let self = this;
    let modal = self.modalCtrl.create('LocationPage', { heading: 'Add New City' });
    modal.onDidDismiss((data: Location) => {
      if (!data) {
        return;
      }
      self.databaseService.addWorldLocation(data).then(success => {
        if (!success) {
          return;
        }
        let exists = _.find(self.arrWorldWeather, obj => obj.location.name === data.name);
        if (exists) {
          self.utilService.showToast(data.name + ' already exists');
          return;
        }
        self.arrWorldWeather.push({
          location: data,
          firstDailyForecast: null,
          timezone: null,
          shouldAnimate: false
        });
        self.forecastService.getForecast(data)
          .subscribe((forecast: Forecast) => {
            if (forecast && forecast.daily && forecast.daily.data) {
              let obj = _.find(self.arrWorldWeather, { location: data });
              if (obj) {
                obj.firstDailyForecast = forecast.daily.data[0];
                obj.timezone = forecast.timezone;
              }
            }
          }, err => {
            console.error(err);
          });
      });
    });
    modal.present();
  }

  delete(location: Location) {
    let self = this;
    self.databaseService.removeWorldLocation(location.name).then(success => {
      if (success) {
        _.remove(self.arrWorldWeather, obj => obj.location.name === location.name);
      }
    });
    self.databaseService.set('stopDeleteAnimation', 'true');
  }

  locationClicked(location: Location) {
    this.navCtrl.push('CityWeatherPage', { location: location });
  }
}

export interface WorldWeather {
  location: Location;
  firstDailyForecast: DataPoint;
  timezone: string;
  shouldAnimate: boolean;
}
