import {Component} from "@angular/core";
import {
  Location,
  Metrics,
  MetricTemp,
  MetricLength,
  MetricDistance,
  MetricPressure,
  DatabaseService,
  CONFIG,
  HOME_CONFIG
} from "../providers";
import {ModalLocation} from "../location/location";
import {ModalController} from "ionic-angular";

@Component({
  templateUrl: 'settings.html'
})
export class SettingsPage {
  public enumTemp = MetricTemp;
  public enumLength = MetricLength;
  public enumDistance = MetricDistance;
  public enumPressure = MetricPressure;
  metrics: Metrics;
  homeLocation: Location;

  constructor(public databaseService: DatabaseService,
              public modalCtrl: ModalController) {
  }

  ionViewWillEnter() {
    this.databaseService.getJson(CONFIG.METRICS).then(data=> {
      this.metrics = data;
    });
    this.databaseService.getJson(HOME_CONFIG.LOCATION).then(data=> {
      this.homeLocation = data;
    });
  }

  metricChange() {
    this.databaseService.setJson(CONFIG.METRICS, this.metrics);
  }

  changeHomeLocation() {
    console.debug('changing home location');
    let self = this;
    let modal = self.modalCtrl.create(ModalLocation, {heading: 'Enter Home City Name'});
    modal.onDidDismiss((data: Location) => {
      if (data) {
        self.databaseService.remove(HOME_CONFIG.LAST_UPDATED)
          .then(()=> {
            self.databaseService.setJson(HOME_CONFIG.LOCATION, data);
            self.homeLocation = data;
          });
      }
    });
    modal.present();
  }
}
