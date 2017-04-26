import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WorldCityListPage } from './world-city-list';
import { DirectivesModule } from '../../directives';

@NgModule({
  declarations: [
    WorldCityListPage
  ],
  imports: [
    DirectivesModule,
    IonicPageModule.forChild(WorldCityListPage)
  ],
  exports: [
    WorldCityListPage
  ]
})
export class WorldCityListPageModule {
}
