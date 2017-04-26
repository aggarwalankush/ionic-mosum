import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { BrowserTab } from '@ionic-native/browser-tab';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { PageInterface, UtilService } from '../providers';

@Component({
  templateUrl: 'app.html'
})
export class MosumApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: string = 'TabsPage';
  pages: Array<{ heading: string, items: PageInterface[] }> = [
    {
      heading: 'Weather',
      items: [
        { title: 'Home', component: 'TabsPage', tabComponent: 'HomeWeatherPage', index: 0, icon: 'home' },
        { title: 'World', component: 'TabsPage', tabComponent: 'WorldCityListPage', index: 1, icon: 'globe' }
      ]
    },
    {
      heading: 'Settings',
      items: [
        { title: 'Settings', component: 'SettingsPage', icon: 'settings' }
      ]
    }
  ];

  constructor(public platform: Platform,
              public utilService: UtilService,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              public browserTab: BrowserTab) {
    this.platformReady();
  }

  platformReady() {
    this.platform.ready().then(() => {
      if (this.platform.is('cordova')) {
        this.initPlugins();
      }
    });
  }

  initPlugins() {
    this.statusBar.styleLightContent();
    this.statusBar.backgroundColorByHexString('#12121c');
    this.splashScreen.hide();
  }

  openPage(page: PageInterface) {
    if (this.isActive(page)) {
      return;
    }
    if (page.index) {
      this.nav.setRoot(page.component, { tabIndex: page.index });
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
    let url = 'https://darksky.net/poweredby/';
    this.browserTab.isAvailable()
      .then((isAvailable: boolean) => {
        if (isAvailable) {
          this.browserTab.openUrl(url);
        }
      })
      .catch(err => console.error(err));
  }
}
