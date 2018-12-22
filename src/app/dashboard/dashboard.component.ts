import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ContactsService } from '@app/services/contacts/contacts.service';
import { ExpensesService } from '@app/services/expenses/expenses.service';
import { InvoicesService } from '@app/services/invoices/invoices.service';

import Contact from '@app/interfaces/contact.interface';
import Expense from '@app/interfaces/expense.interface';
import Invoice from '@app/interfaces/invoice.interface';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

	// NG2-CHART TEST
	chartTestData: Array<any> = [
		{
			data: [ 52000, 51400, 64000, 64150, 65600, 71000 ], 
			label: 'Income'
		},
		{
			data: [ 64000, 63450, 62300, 60050, 57600, 63900 ], 
			label: 'Expenses'
		}
	] 

	chartTestLabels: Array<any> = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun'
	]

	chartTestOptions: any = {
		responsive: true
	}

	chartTestColours: Array<any> = [
		{ // blue-primary
		  backgroundColor: 'rgba(0, 101, 251, 0.1)',
		  borderColor: 'rgba(0, 101, 251, 0.6)',
		  pointBackgroundColor: 'rgba(0, 101, 251, 0.6)',
		  pointBorderColor: '#fff',
		  pointHoverBackgroundColor: '#fff',
		  pointHoverBorderColor: 'rgba(0, 101, 251, 0.75)',
		},
		{ // blue-dark
		  backgroundColor: 'rgba(24, 109, 254, 0.4)',
		  borderColor: 'rgba(24, 109, 254, 0.8)',
		  pointBackgroundColor: 'rgba(24, 109, 254, 0.8)',
		  pointBorderColor: '#fff',
		  pointHoverBackgroundColor: '#fff',
		  pointHoverBorderColor: 'rgba(24, 109, 254, 0.8)',
		}
	]

	chartTestLegend: boolean = true;
	
	contacts: Contact[];
	expenses: Expense[];
	invoices: Invoice[];

	constructor() {

	}
	
	ngOnInit() {

	}

}
