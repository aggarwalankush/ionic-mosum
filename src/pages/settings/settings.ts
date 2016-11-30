import {Component} from "@angular/core";
import {
  Location,
  Metrics,
  MetricTemp,
  MetricLength,
  MetricDistance,
  MetricPressure,
  DatabaseService,
  CONFIG
} from "../providers";
import {ModalLocation} from "../location/location";
import {ModalController} from "ionic-angular";

@Component({
  templateUrl: 'settings.html',
  styles: [`
    .list-ios {
      margin-bottom: 10px;
    }
  `]
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
    this.databaseService.getJson(CONFIG.METRICS).then(data => {
      this.metrics = data;
    });
    this.databaseService.getJson(CONFIG.HOME_LOCATION).then(data => {
      this.homeLocation = data;
    });
  }

  metricChange() {
    this.databaseService.setJson(CONFIG.METRICS, this.metrics);
  }

  changeHomeLocation() {
    let self = this;
    let modal = self.modalCtrl.create(ModalLocation, {heading: 'Enter Home City'});
    modal.onDidDismiss((data: Location) => {
      if (data) {
        self.databaseService.setJson(CONFIG.HOME_LOCATION, data);
        self.homeLocation = data;
      }
    });
    modal.present();
  }
}
