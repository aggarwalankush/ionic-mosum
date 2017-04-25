import {Component, ViewChild} from "@angular/core";
import {Nav, Platform} from "ionic-angular";
import {StatusBar} from "@ionic-native/status-bar";
import {SplashScreen} from "@ionic-native/splash-screen";
import {InAppBrowser} from "@ionic-native/in-app-browser";
import {TabsPage} from "../pages/tabs/tabs";
import {PageInterface, UtilService} from "../pages/providers";
import {HomeWeatherPage} from "../pages/home-weather/home-weather";
import {WorldWeatherPage} from "../pages/world-weather/world-weather";

@Component({
  templateUrl: 'app.html'
})
export class MosumApp {
  @ViewChild(Nav) nav: Nav;
  rootPage = TabsPage;
  pages: Array<{ heading: string, items: PageInterface[] }> = [
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
        {title: 'Settings', component: 'SettingsPage', icon: 'settings'}
      ]
    }
  ];

  constructor(public platform: Platform,
              public utilService: UtilService,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              public inAppBrowser: InAppBrowser) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleLightContent();
      this.statusBar.backgroundColorByHexString("#12121c");
      this.splashScreen.hide();
    });
  }

  openPage(page: PageInterface) {
    if (this.isActive(page)) {
      return;
    }
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
    this.inAppBrowser.create('https://darksky.net/poweredby/', '_system');
  }
}
