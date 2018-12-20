import { NgModule } from '@angular/core';
import { RouterModule, Routes, RouterLinkActive } from '@angular/router';
import { CanActivateRouteGuard } from '@app/can-activate-route.guard';

// Components
	import { NewMileageComponent } from './new-mileage/new-mileage.component';
	import { ViewMileageComponent } from './view-mileage/view-mileage.component';
	import { AllMileageComponent } from './all-mileage/all-mileage.component';

const routes: Routes = [
	{
		path: 'mileage/all',
		component: AllMileageComponent,
		canActivate: [CanActivateRouteGuard]
	},
	{
		path: 'mileage/new',
		component: NewMileageComponent,
		canActivate: [CanActivateRouteGuard]
	},
	{
		path: 'mileage/:id',
		component: ViewMileageComponent,
		canActivate: [CanActivateRouteGuard]
	}
]

@NgModule({

	imports: [
		RouterModule.forChild(routes)
	],
	
	exports: [
		RouterModule
	]
})

export class MileageRoutingModule {

}