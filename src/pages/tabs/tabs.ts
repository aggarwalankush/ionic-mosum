import {Component} from "@angular/core";
import {HomeWeatherPage} from "../home-weather/home-weather";
import {WorldWeatherPage} from "../world-weather/world-weather";

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root: any = HomeWeatherPage;
  tab2Root: any = WorldWeatherPage;

  constructor() {

  }
}
