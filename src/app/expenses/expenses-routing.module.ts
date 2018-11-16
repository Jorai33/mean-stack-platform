import { NgModule } from '@angular/core';
import { RouterModule, Routes, RouterLinkActive, CanActivate } from '@angular/router';
import { CanActivateRouteGuard } from '@app/can-activate-route.guard';

// Components
	import { NewExpenseComponent } from './new-expense/new-expense.component';
	import { NewMileageComponent } from './new-mileage/new-mileage.component';
	import { ViewExpenseComponent } from './view-expense/view-expense.component';
	import { AllExpensesComponent } from './all-expenses/all-expenses.component';

const routes: Routes = [
	{
		path: 'expenses/all',
		component: AllExpensesComponent,
		canActivate: [CanActivateRouteGuard]
	},
	{
		path: 'expenses/new',
		component: NewExpenseComponent,
		canActivate: [CanActivateRouteGuard]
	},
	{
		path: 'expenses/new-mileage',
		component: NewMileageComponent,
		canActivate: [CanActivateRouteGuard]
	},
	{
		path: 'expenses/:id',
		component: ViewExpenseComponent,
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

export class ExpensesRoutingModule {

}