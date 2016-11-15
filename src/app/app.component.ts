import {Component, ViewChild} from "@angular/core";
import {Platform, Nav} from "ionic-angular";
import {StatusBar, Splashscreen} from "ionic-native";
import {TabsPage} from "../pages/tabs/tabs";
import {SettingsPage} from "../pages/settings/settings";
import {PageInterface} from "../pages/providers";

@Component({
  templateUrl: 'app.html'
})
export class MosumApp {
  @ViewChild(Nav) nav: Nav;
  rootPage = TabsPage;
  appPages: PageInterface[] = [
    {title: 'Home', component: TabsPage, index: 0, icon: 'home'},
    {title: 'World', component: TabsPage, index: 1, icon: 'globe'},
    {title: 'Settings', component: SettingsPage, icon: 'settings'}
  ];

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page: PageInterface) {
    if (page.index === undefined) {
      this.nav.setRoot(page.component);
    } else {
      this.nav.setRoot(page.component, {tabIndex: page.index});
    }
  }
}
