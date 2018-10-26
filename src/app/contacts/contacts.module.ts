import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { NewContactComponent } from './new-contact/new-contact.component';
import { ViewContactComponent } from './view-contact/view-contact.component';
import { AllContactsComponent } from './all-contacts/all-contacts.component';

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [
		NewContactComponent,
		ViewContactComponent,
		AllContactsComponent
	]
})

export class ContactsModule {

	constructor() {

	}

}