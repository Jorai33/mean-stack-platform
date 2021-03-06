import { NgModule } from '@angular/core';
import { RouterModule, Routes, RouterLinkActive } from '@angular/router';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CanActivateRouteGuard } from '@app/can-activate-route.guard';

// Components
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { SettingsComponent } from './settings/settings.component';
	
const routes: Routes = [
	{
		path: '',
		redirectTo: 'login',
		pathMatch: 'full'
	},
	{
		path: 'home',
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

	// Settings
	{
		path: 'settings',
		component: SettingsComponent
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
	},

	// Mileage
	{
		path: 'mileage',
		loadChildren: './mileage/mileage.module#MileageModule',
		canActivate: [CanActivateRouteGuard]
	},

	// Products and Services
	{
		path: 'products',
		loadChildren: './products/products.module#ProductsModule',
		canActivate: [CanActivateRouteGuard]
	},

	// Accounts
	{
		path: 'account',
		loadChildren: './accounts/accounts.module#AccountsModule',
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