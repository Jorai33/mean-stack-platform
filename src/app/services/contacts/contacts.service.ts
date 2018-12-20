import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import Contact from '@app/interfaces/contact.interface';

import { NotificationsService } from '@app/services/notifications/notifications.service';
import { AuthService } from '@app/services/auth/auth.service';

@Injectable({
	providedIn: 'root'
})

export class ContactsService {

	uri = 'http://localhost:4000';

	constructor(private http: HttpClient, private notificationsService: NotificationsService, private auth: AuthService) {

	}

	getContacts(): Observable<Contact[]> {
		const headers = new HttpHeaders().set('x-access-token', localStorage.getItem('token'));
		return this.http.get(`${this.uri}/contacts?userId=${this.auth.userId}`, { headers }) as Observable<Contact[]>;
	}

	getContact(contactId): Observable<Contact> {
		const headers = new HttpHeaders().set('x-access-token', localStorage.getItem('token'));
		return this.http.get(`${this.uri}/contacts/${contactId}`, { headers }) as Observable<Contact>;
	}

	saveContact(contact) {
		const headers = new HttpHeaders().set('x-access-token', localStorage.getItem('token'));
		return this.http.post(`${this.uri}/contacts`, contact, { headers });
	}

	updateContact(contact) {
		const headers = new HttpHeaders().set('x-access-token', localStorage.getItem('token'));
		return this.http.post(`${this.uri}/contacts/update/${contact._id}`, contact, { headers });
	}

	deleteContact(contact) {
		const headers = new HttpHeaders().set('x-access-token', localStorage.getItem('token'));
		return this.http.delete(`${this.uri}/contacts/${contact._id}`, { headers });
	}

}