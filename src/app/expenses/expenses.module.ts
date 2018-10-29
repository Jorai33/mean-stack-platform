import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpensesRoutingModule } from './expenses-routing.module';

// Shared/Material Modules
import { SharedModule } from '@app/shared.module';
import { MaterialModule } from '@app/material.module';

// Components
	// New Expense
	import { NewExpenseComponent } from './new-expense/new-expense.component';
	// New Mileage
	import { NewMileageComponent } from './new-mileage/new-mileage.component';
	// View Expense
	import { ViewExpenseComponent } from './view-expense/view-expense.component';
	// Expense List
	import { AllExpensesComponent } from './all-expenses/all-expenses.component';

@NgModule({

	imports: [
		CommonModule,
		ExpensesRoutingModule,
		SharedModule,
		MaterialModule
	],

	declarations: [
		// Components
			// New Expense
			NewExpenseComponent,
			// New Mileage
			NewMileageComponent,
			// View Expense
			ViewExpenseComponent,
			// Expense List
			AllExpensesComponent
	],

	entryComponents: [
            // Dialogs
            
	]

})

export class ExpensesModule {

}