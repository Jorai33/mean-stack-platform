import { NgModule } from '@angular/core';
import { RouterModule, Routes, RouterLinkActive } from '@angular/router';

// Components
import { NewInvoiceComponent } from './new-invoice/new-invoice.component';
import { ViewInvoiceComponent } from './view-invoice/view-invoice.component';
import { AllInvoicesComponent } from './all-invoices/all-invoices.component';

const routes: Routes = [
	{
		path: 'invoices/all',
		component: AllInvoicesComponent
	},
	{
		path: 'invoices/new',
		component: NewInvoiceComponent
	},
	{
		path: 'invoices/:id',
		component: ViewInvoiceComponent
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

export class InvoicesRoutingModule {

}