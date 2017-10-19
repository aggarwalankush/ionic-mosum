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
        { title: 'Home', name: 'TabsPage', tabName: 'HomeWeatherPage', index: 0, icon: 'home' },
        { title: 'World', name: 'TabsPage', tabName: 'WorldCityListPage', index: 1, icon: 'globe' }
      ]
    },
    {
      heading: 'Settings',
      items: [
        { title: 'Settings', name: 'SettingsPage', icon: 'settings' }
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
    let params = page.index ? { tabIndex: page.index } : {};
    if (this.nav.getActiveChildNavs().length && page.index != undefined) {
      this.nav.getActiveChildNavs()[0].select(page.index);
    } else {
      this.nav.setRoot(page.name, params).catch(err => console.error(err));
    }
  }

  isActive(page: PageInterface): boolean {
    let childNav = this.nav.getActiveChildNavs()[0];
    if (childNav) {
      return childNav.getSelected() && childNav.getSelected().root === page.tabName;
    }
    return !!(this.nav.getActive() && this.nav.getActive().name === page.name);
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
