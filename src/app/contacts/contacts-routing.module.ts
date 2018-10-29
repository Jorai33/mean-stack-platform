import { NgModule } from '@angular/core';
import { RouterModule, Routes, RouterLinkActive } from '@angular/router';

// Components
	import { NewContactComponent } from './new-contact/new-contact.component';
	import { ViewContactComponent } from './view-contact/view-contact.component';
	import { AllContactsComponent } from './all-contacts/all-contacts.component';

const routes: Routes = [
	{
		path: 'contacts/new',
		component: NewContactComponent
	},
	{
		path: 'contacts/:id',
		component: ViewContactComponent
	},
	{
		path: 'contacts/all',
		component: AllContactsComponent
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