import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomeWeatherPage } from './home-weather';
import { ComponentsModule } from '../../components';

@NgModule({
  declarations: [
    HomeWeatherPage
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(HomeWeatherPage)
  ],
  exports: [
    HomeWeatherPage
  ]
})
export class HomeWeatherPageModule {
}
