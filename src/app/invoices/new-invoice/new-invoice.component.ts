import { Component, OnInit } from '@angular/core';
import { Observable, from } from 'rxjs';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import * as moment from 'moment';

import Invoice from '@app/interfaces/invoice.interface';
import { DataService } from '@app/services/data/data.service';

@Component({
	selector: 'app-new-invoice',
	templateUrl: './new-invoice.component.html',
	styleUrls: ['./new-invoice.component.scss']
})

export class NewInvoiceComponent implements OnInit {

	invoice: Invoice;

	constructor(public data: DataService) {

	}

	ngOnInit() {

	}

}