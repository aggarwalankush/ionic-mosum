import {Component} from "@angular/core";
import {ModalController} from "ionic-angular";
import {ModalLocation} from "../location/location";
import {ForecastService} from "../providers";

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  data: any ;

  constructor(public modalCtrl: ModalController, public httpService:ForecastService) {
    httpService.get(10, 10)
      .then(data=> {
        console.debug(data);
      })
      .catch(err=> {
        console.error(err);
      });
  }

  showModal() {
    let modal = this.modalCtrl.create(ModalLocation);
    modal.onDidDismiss(data => {
      console.debug('page > modal dismissed > data > ', data);
      this.data = data;
    });
    modal.present();
  }
}
