import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { WeatherDetailPage } from './weather-detail';

@NgModule({
  declarations: [
    WeatherDetailPage
  ],
  imports: [
    IonicPageModule.forChild(WeatherDetailPage)
  ],
  entryComponents: [
    WeatherDetailPage
  ]
})
export class WeatherDetailPageModule {
}
