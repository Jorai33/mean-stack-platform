import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';

import Invoice from '@app/interfaces/invoice.interface';
import { DataService } from '../data/data.service';
import { NotificationsService } from '@app/services/notifications/notifications.service';

@Injectable({
	providedIn: 'root'
})

export class InvoicesService {

	constructor(private database: DataService, private notificationsService: NotificationsService) {

	}
	
	async getInvoices() {
		try {
			const invoices = await this.database.getItems('invoices');
			return invoices as Invoice[];
		} catch(err) {
			return err;
		}
	}

	async getInvoice(invoiceId) {
		try {
			const invoice = await this.database.getItem('invoices', invoiceId);
			return invoice as Invoice;
		} catch(err) {
			return err;
		}
	}

	async sendToContact(contactId) {
		try {
			const contact = await this.database.getItem('contacts', contactId);
			// TODO: Construct and send email
			return;
		} catch(err) {
			return err;
		}
	}

}