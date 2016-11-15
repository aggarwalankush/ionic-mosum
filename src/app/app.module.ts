import {NgModule} from "@angular/core";
import {JsonpModule} from "@angular/http";
import {IonicApp, IonicModule} from "ionic-angular";
import {Sql, DatabaseService, UtilService, ForecastService} from "../pages/providers";
import {MosumApp} from "./app.component";
import {TabsPage} from "../pages/tabs/tabs";
import {ModalLocation} from "../pages/location/location";
import {HomeWeatherPage} from "../pages/home-weather/home-weather";
import {WeatherDetailPage} from "../pages/weather-detail/weather-detail";
import {WorldWeatherPage} from "../pages/world-weather/world-weather";

@NgModule({
  declarations: [
    MosumApp,
    TabsPage,
    ModalLocation,
    HomeWeatherPage,
    WeatherDetailPage,
    WorldWeatherPage
  ],
  imports: [
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
    WorldWeatherPage
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
