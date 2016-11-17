import {Component} from "@angular/core";
import {NavController, ModalController} from "ionic-angular";
import {DatabaseService, Location} from "../providers";
import {ModalLocation} from "../location/location";
import {WorldWeatherDetailPage} from "../world-weather-detail/world-weather-detail";
import * as _ from "lodash";

@Component({
  templateUrl: 'world-weather.html'
})
export class WorldWeatherPage {
  locations: Array<Location>;

  constructor(public navCtrl: NavController,
              public databaseService: DatabaseService,
              public modalCtrl: ModalController) {
  }

  ionViewWillEnter() {
    let self = this;
    this.databaseService.getAllWorldLocations().then(locations=> {
      self.locations = locations;
    });
  }

  addLocation() {
    let self = this;
    let modal = self.modalCtrl.create(ModalLocation, {heading: 'Add New City'});
    modal.onDidDismiss((data: Location) => {
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
    this.navCtrl.push(WorldWeatherDetailPage, {location: location});
  }
}

