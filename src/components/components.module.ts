import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { WeatherListComponent } from './weather-list/weather-list';

@NgModule({
  declarations: [
    WeatherListComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    WeatherListComponent
  ]
})
export class ComponentsModule {
}
