import {Component} from "@angular/core";
import {NavParams} from "ionic-angular";
import {Location} from "../providers";

@Component({
  template: `
    <ion-header>
      <ion-navbar color="primary">
        <ion-title>{{location?.name}} Weather</ion-title>
      </ion-navbar>
    </ion-header>
    <ion-content class="bg-light">
      <weather-list [location]="location"></weather-list>
    </ion-content>
  `
})
export class WorldWeatherDetailPage {
  location: Location;

  constructor(public params: NavParams) {
    this.location = params.data.location;
  }
}
