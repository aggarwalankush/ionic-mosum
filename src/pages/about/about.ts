import {Component} from "@angular/core";
import {ModalController} from "ionic-angular";
import {ModalLocation} from "../location/location";

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  data: any ;

  constructor(public modalCtrl: ModalController) {
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
