import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoicesRoutingModule } from './invoices-routing.module';

// Shared/Material Modules
import { SharedModule } from '@app/shared.module';
import { MaterialModule } from '@app/material.module';

// Components
	// New Invoice
	import { NewInvoiceComponent } from './new-invoice/new-invoice.component';
	// View Invoice
	import { ViewInvoiceComponent } from './view-invoice/view-invoice.component';
	// All Invoices
	import { AllInvoicesComponent } from './all-invoices/all-invoices.component';
	// Dialogs
	import { NewItemDialogComponent } from './dialogs/new-item-dialog/new-item-dialog.component';
import { UpdateContactDialogComponent } from './dialogs/update-contact-dialog/update-contact-dialog.component';
import { NewContactDialogComponent } from './dialogs/new-contact-dialog/new-contact-dialog.component';

@NgModule({

	imports: [
		CommonModule,
		InvoicesRoutingModule,
		SharedModule,
		MaterialModule
	],

	declarations: [
		// Components
			// New Invoice
			NewInvoiceComponent,
			// View Invoice
			ViewInvoiceComponent,
			// All Invoices
			AllInvoicesComponent,
			// Dialogs
			NewItemDialogComponent,
			UpdateContactDialogComponent,
			NewContactDialogComponent
	],
	
	entryComponents: [
			// Dialogs
			NewItemDialogComponent
	]
})

export class InvoicesModule {

}