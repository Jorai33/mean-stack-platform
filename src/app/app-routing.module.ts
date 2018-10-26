import { NgModule } from '@angular/core';
import { RouterModule, Routes, RouterLinkActive } from '@angular/router';
import { CanActivateRouteGuard } from './can-activate-route.guard';

// Components
	import { DashboardComponent } from './dashboard/dashboard.component';
	import { LoginComponent } from './login/login.component';
	import { RegisterComponent } from './register/register.component';
	import { NotificationsComponent } from './notifications/notifications.component';
	
const routes: Routes = [
	{
		path: '',
		redirectTo: 'login',
		pathMatch: 'full'
	},
	{
		path: 'dashboard',
		component: DashboardComponent,
		canActivate: [CanActivateRouteGuard]
	},

	// Login/Register
	{
		path: 'login',
		component: LoginComponent
	},
	{
		path: 'register',
		component: RegisterComponent
	},

	// Notifications
	{
		path: 'notifications',
		component: NotificationsComponent,
		canActivate: [CanActivateRouteGuard]
	},
	{
		path: 'notifications/:id',
		component: NotificationsComponent,
		canActivate: [CanActivateRouteGuard]
	},

	// Contacts
	{
		path: 'contacts',
		loadChildren: './contacts/contacts.module#ContactsModule',
		canActivate: [CanActivateRouteGuard]
	},

	// Expenses
	{
		path: 'expenses',
		loadChildren: './expenses/expenses.module#ExpensesModule',
		canActivate: [CanActivateRouteGuard]
	},

	// Invoices
	{
		path: 'invoices',
		loadChildren: './invoices/invoices.module#InvoicesModule',
		canActivate: [CanActivateRouteGuard]
	}
]

@NgModule ({
	
	imports: [
		RouterModule.forRoot(routes)
	],

	exports: [
		RouterModule
	]
	
})

export class AppRoutingModule {
	
}