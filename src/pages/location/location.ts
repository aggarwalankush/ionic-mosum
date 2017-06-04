import { Component, NgZone, ViewChild } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import { Keyboard } from '@ionic-native/keyboard';
import { Location } from '../../providers';
import * as _ from 'lodash';

declare let google: any;

@IonicPage({
  priority: 'high'
})
@Component({
  selector: 'page-location',
  templateUrl: 'location.html'
})
export class LocationPage {
  @ViewChild('searchInput') searchInput;
  heading: string;
  autocompleteItems: Array<{ description: string, place_id: string }>;
  query: string;
  acService: any;
  locationObj: Location;
  showCancel: boolean;

  constructor(public navParams: NavParams,
              public viewCtrl: ViewController,
              public keyboard: Keyboard,
              public zone: NgZone) {
    this.heading = navParams.get('heading') ? navParams.get('heading') : 'Search City Name';
    this.showCancel = navParams.data.showCancel !== undefined ? navParams.data.showCancel : true;
  }

  ionViewDidEnter() {
    this.zone.run(() => {
      this.searchInput.setFocus();
      this.keyboard.show();
    });
  }

  ionViewWillEnter() {
    this.acService = new google.maps.places.AutocompleteService();
    this.autocompleteItems = [];
    this.query = '';
    this.locationObj = {
      name: null,
      lat: null,
      lng: null
    };
  }

  ionViewWillLeave() {
    this.keyboard.close();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  updateSearch() {
    console.debug('modal > updateSearch > query ', this.query);
    if (this.query.trim() == '') {
      this.autocompleteItems = [];
      return;
    }
    let self = this;
    let config = {
      types: ['(cities)'],
      input: this.query
    };
    this.acService.getPlacePredictions(config, (predictions, status) => {
      console.debug('modal > getPlacePredictions > status > ', status);
      self.zone.run(() => {
        self.autocompleteItems = predictions ? predictions : [];
      });
    });
  }

  chooseItem(item) {
    let self = this;
    let request = {
      placeId: item.place_id
    };
    let response: Location;
    let placesService = new google.maps.places.PlacesService(document.createElement('div'));
    placesService.getDetails(request, (place, status) => {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        self.locationObj.lat = place.geometry.location.lat();
        self.locationObj.lng = place.geometry.location.lng();
        let obj = _.find(place.address_components, ['types[0]', 'locality']);
        if (obj) {
          self.locationObj.name = obj['short_name'];
        }
        response = self.locationObj;
      } else {
        console.debug('page > getPlaceDetail > status > ', status);
      }
      self.zone.run(() => {
        self.viewCtrl.dismiss(response);
      });
    });
  }

}
