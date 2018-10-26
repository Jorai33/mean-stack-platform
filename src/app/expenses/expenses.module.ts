import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { NewExpenseComponent } from './new-expense/new-expense.component';
import { NewMileageComponent } from './new-mileage/new-mileage.component';
import { ViewExpenseComponent } from './view-expense/view-expense.component';
import { AllExpensesComponent } from './all-expenses/all-expenses.component';

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [
		NewExpenseComponent,
		NewMileageComponent,
		ViewExpenseComponent,
		AllExpensesComponent
	]
})

export class ExpensesModule {
	
}