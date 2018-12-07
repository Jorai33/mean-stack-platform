import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import Invoice from '@app/interfaces/invoice.interface';
import { NotificationsService } from '@app/services/notifications/notifications.service';
import { AuthService } from '@app/services/auth/auth.service';

@Injectable({
	providedIn: 'root'
})

export class InvoicesService {

	uri = 'http://localhost:4000';

	constructor(private http: HttpClient, private notificationsService: NotificationsService, private auth: AuthService) {

	}

	getInvoices(): Observable<Invoice[]> {
		const headers = new HttpHeaders().set('x-access-token', localStorage.getItem('token'));
		return this.http.get(`${this.uri}/invoices`, { headers }) as Observable<Invoice[]>;
	}

}