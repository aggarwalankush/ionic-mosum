import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WorldCityListPage } from './world-city-list';
import { AnimateItemSliding } from '../providers/animateItemSliding.directive';

@NgModule({
  declarations: [
    WorldCityListPage,
    AnimateItemSliding
  ],
  imports: [
    IonicPageModule.forChild(WorldCityListPage)
  ],
  exports: [
    WorldCityListPage
  ]
})
export class WorldCityListPageModule {
}
