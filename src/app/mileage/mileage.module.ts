import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MileageRoutingModule } from './mileage-routing.module';

// SHARED/MATERIAL MODULES
import { SharedModule } from '@app/shared.module';
import { MaterialModule } from '@app/material.module';

// Components
	import { NewMileageComponent } from './new-mileage/new-mileage.component';
	import { ViewMileageComponent } from './view-mileage/view-mileage.component';
	import { AllMileageComponent } from './all-mileage/all-mileage.component';

@NgModule({

	imports: [
		CommonModule,
		MileageRoutingModule,
		SharedModule,
		MaterialModule
	],

	declarations: [
		// Components
			// New Mileage
			NewMileageComponent,
			// View Mileage
			ViewMileageComponent,
			// All Mileage
			AllMileageComponent
	]
})

export class MileageModule {

}