import { NgModule } from '@angular/core';
import { JsonpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IonicApp, IonicModule } from 'ionic-angular';
import { BrowserTab } from '@ionic-native/browser-tab';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { DatabaseService, ForecastService, Sql, UtilService } from '../pages/providers';
import { MosumApp } from './app.component';
import { ModalLocation } from '../pages/location/location';
import { WorldWeatherDetailPage } from '../pages/world-weather-detail/world-weather-detail';
import { WeatherListTemplate } from '../pages/template/weather-list.template';

@NgModule({
  declarations: [
    MosumApp,
    ModalLocation,
    WeatherListTemplate,
    WorldWeatherDetailPage
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(MosumApp, { tabsPlacement: 'bottom' }),
    JsonpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MosumApp,
    ModalLocation,
    WeatherListTemplate,
    WorldWeatherDetailPage
  ],
  providers: [
    Sql,
    DatabaseService,
    UtilService,
    ForecastService,
    SplashScreen,
    StatusBar,
    BrowserTab
  ]
})
export class AppModule {
}
