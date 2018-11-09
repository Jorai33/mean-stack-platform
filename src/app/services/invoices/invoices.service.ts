import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import Invoice from '@app/invoices/invoice.interface';
import { DataService } from '../data/data.service';

@Injectable({
	providedIn: 'root'
})

export class InvoicesService {

	constructor(private database: DataService) {

	}
	
	async getInvoices() {
		try {
			const invoices = await this.database.getItems('invoices');
			return invoices as Invoice[];
		} catch(err) {
			return err;
		}
	}

}