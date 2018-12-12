import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import Expense from '@app/interfaces/expense.interface';

import { NotificationsService } from '@app/services/notifications/notifications.service';
import { AuthService } from '../auth/auth.service';

@Injectable({
	providedIn: 'root'
})

export class ExpensesService {

	uri = 'http://localhost:4000';

	constructor(private http: HttpClient, private notificationsService: NotificationsService, private auth: AuthService) {

	}

	getExpenses(): Observable<Expense[]> {
		const headers = new HttpHeaders().set('x-access-token', localStorage.getItem('token'));
		return this.http.get(`${this.uri}/invoices?userId=${this.auth.userId}`, { headers }) as Observable<Expense[]>;
	}

}