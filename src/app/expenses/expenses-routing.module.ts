import { NgModule } from '@angular/core';
import { RouterModule, Routes, RouterLinkActive } from '@angular/router';

// Components
	import { NewExpenseComponent } from './new-expense/new-expense.component';
	import { NewMileageComponent } from './new-mileage/new-mileage.component';
	import { ViewExpenseComponent } from './view-expense/view-expense.component';
	import { AllExpensesComponent } from './all-expenses/all-expenses.component';

const routes: Routes = [
	{
		path: 'expenses/new',
		component: NewExpenseComponent
	},
	{
		path: 'expenses/new-mileage',
		component: NewMileageComponent
	},
	{
		path: 'expenses/:id',
		component: ViewExpenseComponent
	},
	{
            path: 'expenses/all',
		component: AllExpensesComponent
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

export class ExpensesRoutingModule {

}