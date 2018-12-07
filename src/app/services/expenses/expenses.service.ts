import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import Expense from '@app/interfaces/expense.interface';
import { NotificationsService } from '@app/services/notifications/notifications.service';

@Injectable({
	providedIn: 'root'
})

export class ExpensesService {

	uri = 'http://localhost:4000';

	constructor(private http: HttpClient, private notificationsService: NotificationsService) {

	}

	getExpenses(): Observable<Expense[]> {
		return this.http.get(`${this.uri}/expenses`) as Observable<Expense[]>;
	}

}