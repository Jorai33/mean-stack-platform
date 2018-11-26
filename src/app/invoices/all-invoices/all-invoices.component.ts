import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, from } from 'rxjs';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import * as moment from 'moment';

import Invoice from '@app/interfaces/invoice.interface';
import { InvoicesService } from '@app/services/invoices/invoices.service';
import { DataService } from '@app/services/data/data.service';

@Component({
	selector: 'app-all-invoices',
	templateUrl: './all-invoices.component.html',
	styleUrls: ['./all-invoices.component.scss']
})

export class AllInvoicesComponent implements OnInit {

	invoices;
	total: Number = 0;
	
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
	dataSource = new MatTableDataSource<any>();
	tableColumns = [
		'id',
		'reference',
		'saleDate',
		'dueDate',
		'subtotal',
		'tax',
		'total',
		'status'
	]

	constructor(public invoicesService: InvoicesService, private dataService: DataService, private router: Router) {

	}

	ngOnInit() {
		this.buildTable();
	}
	
	ngAfterViewInit() {
		
	}

	async buildTable() {
		try {
			this.invoices = await this.dataService.getItems('invoices');
			this.dataSource.data = this.invoices;
			this.dataSource.paginator = this.paginator;
			this.dataSource.sort = this.sort;
			this.calculateTotal();
		} catch(err) {
			console.error(`Error retrieving invoices: ${err.Message}`);
		}
	}

	calculateTotal() {
		this.invoices.forEach(invoice => {
			if (moment(invoice.date).isAfter(moment().subtract(365, 'days'))) {
				this.total += invoice.total;
			}
		})
	}

	viewInvoice(invoice) {
		this.router.navigateByUrl(`invoices/${invoice.id}`)
	}

	getInvoiceStatus(invoice) {
		if (invoice.outstanding == 0) {
			return 'paid';
		} else if (moment(invoice.dueDate).isAfter(moment())) {
			return 'open';
		} else {
			return 'overdue';
		}
	}

}
