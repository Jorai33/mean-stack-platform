import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

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

// MomentJS
import * as _moment from 'moment';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';

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
import { DataService } from '@app/services/data/data.service';
import { ExpensesService } from '@app/services/expenses/expenses.service';
import { InvoicesService } from '@app/services/invoices/invoices.service';
import { TaxCodesService } from '@app/services/tax-codes/tax-codes.service';
import { NominalsService } from '@app/services/nominals/nominals.service';
import { NotificationsService } from '@app/services/notifications/notifications.service';
import { UsersService } from '@app/services/users/users.service';

const UK_DATE_FORMAT = {
	parse: {
		dateInput: 'LL',
	},
	display: {
		dateInput: 'LL',
		monthYearLabel: 'MMM YYYY',
		dateA11yLabel: 'LL',
		monthYearA11yLabel: 'MMMM YYYY',
	}
}

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
		ScrollingModule,

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
		DataService,
		ExpensesService,
		InvoicesService,
		TaxCodesService,
		NominalsService,
		NotificationsService,
		UsersService,

		// Locale
		{
			provide: DateAdapter,
			useClass: MomentDateAdapter,
			deps: [
				MAT_DATE_LOCALE
			]
		},
		{
			provide: MAT_DATE_FORMATS,
			useValue: UK_DATE_FORMAT
		}
	]
})

export class SharedModule {

}