import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { WorldWeatherPage } from './world-weather';
import { AnimateItemSliding } from '../providers/animateItemSliding.directive';

@NgModule({
	declarations: [
		WorldWeatherPage,
		AnimateItemSliding
	],
	imports: [
		IonicPageModule.forChild(WorldWeatherPage)
	],
	entryComponents: [
		WorldWeatherPage
	]
})
export class WorldWeatherPageModule {}