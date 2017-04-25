import {NgModule} from "@angular/core";
import {JsonpModule} from "@angular/http";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {IonicApp, IonicModule} from "ionic-angular";
import {InAppBrowser} from "@ionic-native/in-app-browser";
import {SplashScreen} from "@ionic-native/splash-screen";
import {StatusBar} from "@ionic-native/status-bar";
import {AnimateItemSliding, DatabaseService, ForecastService, Sql, UtilService} from "../pages/providers";
import {MosumApp} from "./app.component";
import {TabsPage} from "../pages/tabs/tabs";
import {ModalLocation} from "../pages/location/location";
import {HomeWeatherPage} from "../pages/home-weather/home-weather";
import {WeatherDetailPage} from "../pages/weather-detail/weather-detail";
import {WorldWeatherPage} from "../pages/world-weather/world-weather";
import {WorldWeatherDetailPage} from "../pages/world-weather-detail/world-weather-detail";
import {WeatherListTemplate} from "../pages/template/weather-list.template";

@NgModule({
  declarations: [
    MosumApp,
    TabsPage,
    AnimateItemSliding,
    ModalLocation,
    HomeWeatherPage,
    WeatherDetailPage,
    WorldWeatherPage,
    WeatherListTemplate,
    WorldWeatherDetailPage
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(MosumApp, {tabsPlacement: 'bottom'}),
    JsonpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MosumApp,
    TabsPage,
    ModalLocation,
    HomeWeatherPage,
    WeatherDetailPage,
    WorldWeatherPage,
    WeatherListTemplate,
    WorldWeatherDetailPage
  ],
  providers: [
    Sql,
    DatabaseService,
    UtilService,
    ForecastService,
    InAppBrowser,
    SplashScreen,
    StatusBar
  ]
})
export class AppModule {
}
