import {NgModule} from "@angular/core";
import {IonicApp, IonicModule} from "ionic-angular";
import {MyApp} from "./app.component";
import {AboutPage} from "../pages/about/about";
import {ContactPage} from "../pages/contact/contact";
import {HomePage} from "../pages/home/home";
import {TabsPage} from "../pages/tabs/tabs";
import {ModalLocation} from "../pages/location/location";
import {Sql, DatabaseService, UtilService, ForecastService} from "../pages/providers";
import {JsonpModule} from "@angular/http";
import {HomeWeatherPage} from "../pages/home-weather/home-weather";

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    ModalLocation,
    HomeWeatherPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    JsonpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    ModalLocation,
    HomeWeatherPage
  ],
  providers: [
    Sql,
    DatabaseService,
    UtilService,
    ForecastService
  ]
})
export class AppModule {
}
