import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import Contact from '@app/interfaces/contact.interface';
import { NotificationsService } from '@app/services/notifications/notifications.service';

@Injectable({
	providedIn: 'root'
})

export class ContactsService {

	uri = 'http://localhost:4000';

	constructor(private http: HttpClient, private notificationsService: NotificationsService) {

	}

	getContacts(): Observable<Contact[]> {
		return this.http.get(`${this.uri}/contacts`) as Observable<Contact[]>;
	}

}