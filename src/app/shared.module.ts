import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Angular Resources
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Routing
import { AppRoutingModule } from '@app/app-routing.module';
import { RouterLinkActive, CanActivate } from '@angular/router';
import { CanActivateRouteGuard } from '@app/can-activate-route.guard';

// HTTP
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';

// Moment
import * as _moment from 'moment';

// Lodash
import * as _ from 'lodash';

// Electron
import { NgxElectronModule } from 'ngx-electron';

// NG2-Charts
import { ChartsModule } from 'ng2-charts';

// Pipes
import { SortByPipe } from './pipes/sort-by/sort-by.pipe';

// Global Directives
import { ParseIntDirective } from '@app/directives/parse-int.directive';
import { ParseFloatDirective } from '@app/directives/parse-float.directive';

// Services
import { AuthService } from './services/auth/auth.service';
import { ContactsService } from '@app/services/contacts/contacts.service';
import { ExpensesService } from '@app/services/expenses/expenses.service';
import { InvoicesService } from '@app/services/invoices/invoices.service';
import { TaxCodesService } from '@app/services/tax-codes/tax-codes.service';
import { NominalsService } from '@app/services/nominals/nominals.service';
import { NotificationsService } from '@app/services/notifications/notifications.service';
import { UsersService } from '@app/services/users/users.service';

@NgModule({

	declarations: [
		// Pipes
        SortByPipe,
		
		// Global Directives
        ParseIntDirective,
		ParseFloatDirective,
	],

	imports: [
		CommonModule,

		// Angular Resources
		FlexLayoutModule,
		FormsModule,
		ReactiveFormsModule,

		// Routing
		// AppRoutingModule,

		// HTTP
		HttpModule,
		HttpClientModule,

		// Electron
		NgxElectronModule,

		// NG2-Charts
		ChartsModule
	],

	exports: [
		// Angular Resources
		FlexLayoutModule,
		FormsModule,
		ReactiveFormsModule,

		// HTTP
		HttpModule,
		HttpClientModule,

		// Electron
		NgxElectronModule,

		// NG2-Charts
		ChartsModule,

		// Pipes
        SortByPipe,
		
		// Global Directives
        ParseIntDirective,
	    	ParseFloatDirective,
	],

	providers: [
		CanActivateRouteGuard,

		// Services
		AuthService,
		ContactsService,
		InvoicesService,
		ExpensesService,
		TaxCodesService,
		NominalsService,
		NotificationsService,
		UsersService
	]
})

export class SharedModule {

}