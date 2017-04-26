import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { Location } from '../../providers';

@IonicPage()
@Component({
  selector: 'page-city-weather',
  templateUrl: 'city-weather.html'
})
export class CityWeatherPage {
  location: Location;

  constructor(public params: NavParams) {
    this.location = params.data.location;
  }
}
