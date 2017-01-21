import {Component, ViewChild} from "@angular/core";
import {Platform, Nav} from "ionic-angular";
import {StatusBar, Splashscreen, InAppBrowser} from "ionic-native";
import {TabsPage} from "../pages/tabs/tabs";
import {SettingsPage} from "../pages/settings/settings";
import {PageInterface, UtilService} from "../pages/providers";
import {HomeWeatherPage} from "../pages/home-weather/home-weather";
import {WorldWeatherPage} from "../pages/world-weather/world-weather";

@Component({
  templateUrl: 'app.html'
})
export class MosumApp {
  @ViewChild(Nav) nav: Nav;
  rootPage = TabsPage;
  pages: Array<{heading: string, items: PageInterface[]}> = [
    {
      heading: 'Weather',
      items: [
        {title: 'Home', component: TabsPage, tabComponent: HomeWeatherPage, index: 0, icon: 'home'},
        {title: 'World', component: TabsPage, tabComponent: WorldWeatherPage, index: 1, icon: 'globe'}
      ]
    },
    {
      heading: 'Settings',
      items: [
        {title: 'Settings', component: SettingsPage, icon: 'settings'}
      ]
    }
  ];

  constructor(platform: Platform, public utilService: UtilService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleLightContent();
      StatusBar.backgroundColorByHexString("#12121c");
      Splashscreen.hide();
    });
  }

  openPage(page: PageInterface) {
    if (page.index) {
      this.nav.setRoot(page.component, {tabIndex: page.index});
    } else {
      this.nav.setRoot(page.component);
    }
  }

  isActive(page: PageInterface): boolean {
    let childNav = this.nav.getActiveChildNav();

    // Tabs are a special case because they have their own navigation
    if (childNav) {
      if (childNav.getSelected() && childNav.getSelected().root === page.tabComponent) {
        return true;
      }
      return false;
    }

    if (this.nav.getActive() && this.nav.getActive().component === page.component) {
      return true;
    }
    return false;
  }

  poweredBy() {
    new InAppBrowser('https://darksky.net/poweredby/', '_system');
  }
}
