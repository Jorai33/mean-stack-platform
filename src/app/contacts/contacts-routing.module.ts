import { NgModule } from '@angular/core';
import { RouterModule, Routes, RouterLinkActive } from '@angular/router';
import { CanActivateRouteGuard } from '@app/can-activate-route.guard';

// Components
	import { NewContactComponent } from './new-contact/new-contact.component';
	import { ViewContactComponent } from './view-contact/view-contact.component';
	import { AllContactsComponent } from './all-contacts/all-contacts.component';

const routes: Routes = [
	{
		path: 'contacts/all',
		component: AllContactsComponent,
		canActivate: [CanActivateRouteGuard]
	},
	{
		path: 'contacts/new',
		component: NewContactComponent,
		canActivate: [CanActivateRouteGuard]
	},
	{
		path: 'contacts/:id',
		component: ViewContactComponent,
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

export class ContactsRoutingModule {

}