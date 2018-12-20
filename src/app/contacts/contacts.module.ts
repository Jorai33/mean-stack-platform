import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactsRoutingModule } from './contacts-routing.module';

// SHARED/MATERIAL MODULES
import { SharedModule } from '@app/shared.module';
import { MaterialModule } from '@app/material.module';

// Components
	// New Contact
	import { NewContactComponent } from './new-contact/new-contact.component';
	// View Contact
      import { ViewContactComponent } from './view-contact/view-contact.component';
      // All Contacts
      import { AllContactsComponent } from './all-contacts/all-contacts.component';
import { DeleteContactDialogComponent } from './dialogs/delete-contact-dialog/delete-contact-dialog.component';

@NgModule({

	imports: [
		CommonModule,
		ContactsRoutingModule,
		SharedModule,
		MaterialModule
	],

	declarations: [
		// Components
			// New Contact
			NewContactComponent,
			// View Contact
			ViewContactComponent,
			// All Contacts
			AllContactsComponent,
			// Dialogs
			DeleteContactDialogComponent
	],

	entryComponents: [
		// Dialogs
		DeleteContactDialogComponent
	]
})

export class ContactsModule {

}