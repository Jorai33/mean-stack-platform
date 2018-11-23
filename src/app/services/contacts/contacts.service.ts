import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import Contact from '@app/interfaces/contact.interface';
import { DataService } from '@app/services/data/data.service';
import { NotificationsService } from '@app/services/notifications/notifications.service';

@Injectable({
	providedIn: 'root'
})

export class ContactsService {

	contacts;
	contacts$;

	constructor(private data: DataService, private notificationsService: NotificationsService) {		
		this.data.getItems('contacts')
			.then(contacts => {
				this.contacts = contacts;
			})
			.catch(err => {
				this.notificationsService.createAlert(`Error retrieving contacts at ContactsService: ${err.message}`, 'Close');
			})
	}

}