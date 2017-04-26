import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { UtilService } from '../../providers';

@IonicPage({
  priority: 'high'
})
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root: any = 'HomeWeatherPage';
  tab2Root: string = 'WorldCityListPage';
  mySelectedIndex: number;

  constructor(public navParams: NavParams,
              public utilService: UtilService) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;
  }
}
