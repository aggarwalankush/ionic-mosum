import {Component} from "@angular/core";
import {NavController, ModalController} from "ionic-angular";
import {UtilService, ForecastService, DatabaseService, Location} from "../providers";
import {ModalLocation} from "../location/location";
import * as _ from "lodash";

@Component({
  templateUrl: 'world-weather.html'
})
export class WorldWeatherPage {

  locations: Array<Location>;

  constructor(public navCtrl: NavController,
              public forecastService: ForecastService,
              public databaseService: DatabaseService,
              public modalCtrl: ModalController,
              public utilService: UtilService) {
  }

  ionViewWillEnter() {
    let self = this;
    this.databaseService.getAllWorldLocations()
      .then(locations=> {
        self.locations = locations;
      });
  }

  addCity() {
    let self = this;
    let modal = self.modalCtrl.create(ModalLocation, {heading: 'Add New City'});
    modal.onDidDismiss((data: Location) => {
      console.debug('page > modal dismissed > data > ', data);
      if (data) {
        self.databaseService.addWorldLocation(data).then(success=> {
          if (success) {
            self.locations.push(data);
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
        _.remove(self.locations, obj=> obj.name === location.name);
      }
    })
  }

  locationClicked(location: Location) {
    console.log(JSON.stringify(location));
  }
}
