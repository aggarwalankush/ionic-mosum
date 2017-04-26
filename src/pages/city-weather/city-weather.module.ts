import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CityWeatherPage } from './city-weather';
import { ComponentsModule } from '../../components';

@NgModule({
  declarations: [
    CityWeatherPage
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(CityWeatherPage)
  ],
  exports: [
    CityWeatherPage
  ]
})
export class CityWeatherPageModule {
}
