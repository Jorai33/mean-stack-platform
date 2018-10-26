import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { NewInvoiceComponent } from './new-invoice/new-invoice.component';
import { ViewInvoiceComponent } from './view-invoice/view-invoice.component';
import { AllInvoicesComponent } from './all-invoices/all-invoices.component';

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [
		NewInvoiceComponent,
		ViewInvoiceComponent,
		AllInvoicesComponent
	]
})

export class InvoicesModule {

}