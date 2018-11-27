import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { MatTableDataSource, MatSort } from '@angular/material';
import * as moment from 'moment';

import Invoice from '@app/interfaces/invoice.interface';
import { DataService } from '@app/services/data/data.service';
import { NotificationsService } from '@app/services/notifications/notifications.service';

@Component({
	selector: 'app-view-invoice',
	templateUrl: './view-invoice.component.html',
	styleUrls: ['./view-invoice.component.scss']
})

export class ViewInvoiceComponent implements OnInit {

	invoice: Invoice;

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

	constructor(private router: Router, private activatedRoute: ActivatedRoute, private database: DataService, private notificationsService: NotificationsService) {
		this.error = false;
	}

	async ngOnInit() {
		let invoiceId;

		this.activatedRoute.params.subscribe(param => {
			invoiceId = param.id;
		})
		
		try {
			this.invoice = await this.database.getItem('invoices', invoiceId) as Invoice;
			this.dataSource.data = this.invoice.items;
			this.dataSource.sort = this.sort;
		} catch(err) {
			this.notificationsService.createAlert(`Error retrieving invoice: ${err.message}`, 'Close');
			this.error = true;
		}
	}

	updateContact() {
		// TODO:
	}

	addItem() {
		// TODO:
	}

	saveInvoice() {
		// TODO:
	}

	sendInvoice() {
		// TODO:
	}

}
