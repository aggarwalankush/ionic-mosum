import {Component} from "@angular/core";
import {Platform, ModalController} from "ionic-angular";
import {StatusBar, Splashscreen} from "ionic-native";
import {TabsPage} from "../pages/tabs/tabs";
import {DatabaseService, MetricTemp, MetricLength, MetricDistance, MetricPressure} from "../pages/providers";
import {ModalLocation} from "../pages/location/location";
import {Location} from "../pages/providers/model";


@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage = TabsPage;

  constructor(platform: Platform,
              public databaseService: DatabaseService,
              public modalCtrl: ModalController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
      this.init();
    });
  }

  init() {
    let self = this;
    this.databaseService.getJson('homeLocation').then(data=> {
      if (data === null) {
        let modal = self.modalCtrl.create(ModalLocation, {heading: 'Enter Home City Name'});
        modal.onDidDismiss((data: Location) => {
          console.debug('page > modal dismissed > data > ', data);
          self.databaseService.setJson('homeLocation', data);
        });
        modal.present();
      }
    });
    let metrics = {
      temp: MetricTemp.F,
      length: MetricLength.IN,
      distance: MetricDistance.MI,
      time: 12,
      pressure: MetricPressure.MBAR
    };
    this.databaseService.getJson('metrics').then(data=> {
      if (data === null) {
        self.databaseService.setJson('metrics', metrics);
      }
    });
  }
}
