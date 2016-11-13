import {Component} from "@angular/core";
import {ModalController} from "ionic-angular";
import {ModalLocation} from "../location/location";
import {ForecastService} from "../providers";
import {DatabaseService} from "../providers/database.service";
import {UtilService} from "../providers/util.service";

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  data: any;

  constructor(public modalCtrl: ModalController,
              public httpService: ForecastService,
              public ds: DatabaseService,
              public us: UtilService) {
    httpService.get(10, 10)
      .then(data=> {
        console.debug(JSON.stringify(data));
      })
      .catch(err=> {
        console.error(err);
      });

    ds.get('location')
      .then(data=> {
        console.log(data);
      });

    let tz = 'Asia/Kolkata';
    let epoch = 1479093355;
    console.debug(us.getStandardDay(epoch, tz));
    console.debug(us.getCalendarDay(epoch, tz));
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
