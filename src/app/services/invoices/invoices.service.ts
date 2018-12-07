import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import Invoice from '@app/interfaces/invoice.interface';
import { NotificationsService } from '@app/services/notifications/notifications.service';

@Injectable({
	providedIn: 'root'
})

export class InvoicesService {

	uri = 'http://localhost:4000';

	constructor(private http: HttpClient, private notificationsService: NotificationsService) {

	}

	getInvoices(): Observable<Invoice[]> {
		return this.http.get(`${this.uri}/invoices`) as Observable<Invoice[]>;
	}

}