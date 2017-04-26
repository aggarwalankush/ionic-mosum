import { Component, OnInit } from '@angular/core';
import {
  CONFIG,
  DatabaseService,
  Location,
  MetricDistance,
  MetricLength,
  MetricPressure,
  Metrics,
  MetricTemp
} from '../../providers';
import { IonicPage, ModalController } from 'ionic-angular';

@IonicPage()
@Component({
  templateUrl: 'settings.html',
  styles: [`
    .list-ios {
      margin-bottom: 10px;
    }
  `]
})
export class SettingsPage implements OnInit {
  public enumTemp = MetricTemp;
  public enumLength = MetricLength;
  public enumDistance = MetricDistance;
  public enumPressure = MetricPressure;
  metrics: Metrics;
  homeLocation: Location;

  constructor(public databaseService: DatabaseService,
              public modalCtrl: ModalController) {
  }

  ngOnInit() {
    this.databaseService.getJson(CONFIG.HOME_LOCATION).then(data => this.homeLocation = data);
    this.databaseService.getJson(CONFIG.METRICS).then(data => this.metrics = data);
  }

  metricChange() {
    this.databaseService.setJson(CONFIG.METRICS, this.metrics);
  }

  changeHomeLocation() {
    let self = this;
    let modal = self.modalCtrl.create('LocationPage', { heading: 'Enter Home City' });
    modal.onDidDismiss((data: Location) => {
      if (data) {
        self.databaseService.setJson(CONFIG.HOME_LOCATION, data);
        self.homeLocation = data;
      }
    });
    modal.present();
  }
}
