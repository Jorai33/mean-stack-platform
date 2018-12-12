import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatTableDataSource, MatSort } from '@angular/material';
import * as moment from 'moment';

import Invoice from '@app/interfaces/invoice.interface';
import { NotificationsService } from '@app/services/notifications/notifications.service';
import { InvoicesService } from '@app/services/invoices/invoices.service';

@Component({
	selector: 'app-view-invoice',
	templateUrl: './view-invoice.component.html',
	styleUrls: ['./view-invoice.component.scss']
})

export class ViewInvoiceComponent implements OnInit {

	invoice;
	unsubscribe$ = new Subject();

	error: boolean;

	@ViewChild(MatSort) sort: MatSort;
	dataSource = new MatTableDataSource<any>();
	tableColumns = [
		'description',
		'type',
		'unitPrice',
		'quantity',
		'subtotal',
		'tax',
		'total',
		'notes'
	]

	constructor(private router: Router, private activatedRoute: ActivatedRoute, private invoicesService: InvoicesService, private notificationsService: NotificationsService) {
		this.error = false;
	}

	async ngOnInit() {
		let invoiceId;

		this.activatedRoute.params.subscribe(param => {
			invoiceId = param.id;
		})
		
		try {
			const invoice$ = await this.invoicesService.getInvoice(invoiceId);

			invoice$
				.pipe(takeUntil(this.unsubscribe$))
				.subscribe(invoice => {
					this.invoice = invoice;
					this.dataSource.data = this.invoice.items;
					this.dataSource.sort = this.sort;
				})
		} catch(err) {
			this.notificationsService.createAlert(`Error retrieving invoice: ${err.message}`, 'Close');
			this.error = true;
		}
	}

	updateContact() {
		console.log('ViewInvoice.updateContact()');
	}

	addItem() {
		console.log('ViewInvoice.addItem()');
	}

	saveInvoice() {
		console.log('ViewInvoice.saveInvoice()');
	}

	sendInvoice() {
		console.log('ViewInvoice.sendInvoice()');
	}

	ngOnDestroy() {
		this.unsubscribe$.next();
		this.unsubscribe$.complete();
	}

}
