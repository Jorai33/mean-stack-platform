// Angular Core
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, LOCALE_ID } from '@angular/core';

// App Routing Module
import { AppRoutingModule } from '@app/app-routing.module';

// Route Guard
import { CanActivateRouteGuard } from '@app/can-activate-route.guard';

// Feature Modules
import { ContactsModule } from '@app/contacts/contacts.module';
import { ExpensesModule } from '@app/expenses/expenses.module';
import { InvoicesModule } from '@app/invoices/invoices.module'; 

// Material Module
import { MaterialModule } from '@app/material.module';

// Shared Module
import { SharedModule } from '@app/shared.module';

// Unique Components
import { AppComponent } from '@app/app.component';
import { DashboardComponent } from '@app/dashboard/dashboard.component';
import { LoginComponent } from '@app/login/login.component';
import { RegisterComponent } from '@app/register/register.component';
import { NotificationsComponent } from '@app/notifications/notifications.component';
import { SettingsComponent } from './settings/settings.component';


@NgModule({
	declarations: [
		AppComponent,
		DashboardComponent,
		LoginComponent,
		RegisterComponent,
		NotificationsComponent,
		SettingsComponent
	],
	imports: [
        // Angular Core
		BrowserModule,
		BrowserAnimationsModule,

		// Feature Modules
		InvoicesModule,
		ContactsModule,
		ExpensesModule,

		// App Routing Module
		AppRoutingModule,

		// Material Module
		MaterialModule,

            // Shared Module
		SharedModule
	],
	providers: [
		CanActivateRouteGuard
		// {
		// 	provide: LOCALE_ID,
		// 	useValue: 'en-GB'
		// }
	],
	bootstrap: [AppComponent]
})

export class AppModule { }