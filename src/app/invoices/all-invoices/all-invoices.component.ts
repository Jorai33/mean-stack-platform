import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import * as moment from 'moment';

import Invoice from '@app/interfaces/invoice.interface';
import { InvoicesService } from '@app/services/invoices/invoices.service';

@Component({
	selector: 'app-all-invoices',
	templateUrl: './all-invoices.component.html',
	styleUrls: ['./all-invoices.component.scss']
})

export class AllInvoicesComponent implements OnInit {

	invoices$;
	unsubscribe$ = new Subject();
	total: number = 0;
	
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
	tableData = new MatTableDataSource<any>();
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

	constructor(public invoicesService: InvoicesService, private router: Router) {

	}

	ngOnInit() {
		this.buildTable();
	}
	
	ngAfterViewInit() {
		
	}

	async buildTable() {
		try {
			this.invoices$ = await this.invoicesService.getInvoices();

			this.invoices$
				.pipe(takeUntil(this.unsubscribe$))
				.subscribe((invoices: Invoice[]) => {
					this.tableData.data = invoices;
					this.calculateTotal(invoices);
				})

			this.tableData.paginator = this.paginator;
			this.tableData.sort = this.sort;
		} catch(err) {
			console.error(`Error retrieving invoices: ${err.Message}`);
		}
	}

	calculateTotal(invoices) {
		invoices.forEach(invoice => {
			if (moment(invoice.saleDate).isAfter(moment().subtract(365, 'days'))) {
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

	ngOnDestroy() {
		this.unsubscribe$.next();
		this.unsubscribe$.complete();
	}

}
