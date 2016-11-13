import {Component} from "@angular/core";
import {HomePage} from "../home/home";
import {AboutPage} from "../about/about";
import {ContactPage} from "../contact/contact";
import {HomeWeatherPage} from "../home-weather/home-weather";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomePage;
  tab2Root: any = HomeWeatherPage;
  tab3Root: any = ContactPage;

  constructor() {

  }
}
