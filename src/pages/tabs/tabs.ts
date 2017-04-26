import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { HomeWeatherPage } from '../home-weather/home-weather';
import { UtilService } from '../providers/util.service';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root: any = HomeWeatherPage;
  tab2Root: string = 'WorldWeatherPage';
  mySelectedIndex: number;

  constructor(public navParams: NavParams,
              public utilService: UtilService) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;
  }
}
