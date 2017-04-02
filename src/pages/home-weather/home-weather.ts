import {Component, EventEmitter} from "@angular/core";
import {ModalController} from "ionic-angular";
import {CONFIG, DatabaseService, Location} from "../providers";
import {ModalLocation} from "../location/location";

@Component({
  templateUrl: 'home-weather.html'
})
export class HomeWeatherPage {
  onInitEmitter: EventEmitter<string>;
  onDestroyEmitter: EventEmitter<string>;
  location: Location;

  constructor(public databaseService: DatabaseService,
              public modalCtrl: ModalController) {
    this.onInitEmitter = new EventEmitter<string>();
    this.onDestroyEmitter = new EventEmitter<string>();
  }

  ionViewWillEnter() {
    let self = this;
    this.databaseService.getJson(CONFIG.HOME_LOCATION).then(data => {
      if (data === null) {
        let modal = self.modalCtrl.create(ModalLocation, {heading: 'Enter Home City', showCancel: false});
        modal.onDidDismiss((data: Location) => {
          console.debug('page > modal dismissed > data > ', data);
          if (data) {
            self.databaseService.setJson(CONFIG.HOME_LOCATION, data);
            self.location = data;
            self.emitInit();
          }
        });
        modal.present();
      } else {
        self.location = data;
        self.emitInit();
      }
    });
  }

  emitInit() {
    if (this.onInitEmitter) {
      this.onInitEmitter.emit('');
    }
  }

  ionViewWillLeave() {
    if (this.onDestroyEmitter) {
      this.onDestroyEmitter.emit('');
    }
  }
}
