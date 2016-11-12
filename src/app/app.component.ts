import {Component} from "@angular/core";
import {Platform, ModalController} from "ionic-angular";
import {StatusBar, Splashscreen} from "ionic-native";
import {TabsPage} from "../pages/tabs/tabs";
import {DatabaseService} from "../pages/providers";
import {ModalLocation} from "../pages/location/location";


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
    this.databaseService.getJson('location')
      .then(data=> {
        if (data === null) {
          let modal = self.modalCtrl.create(ModalLocation, {heading: 'Enter Home City Name'});
          modal.onDidDismiss(data => {
            console.debug('page > modal dismissed > data > ', data);
            self.databaseService.setJson('location', data);
          });
          modal.present();
        }
      });
  }
}
