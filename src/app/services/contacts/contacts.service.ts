import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import Contact from '@app/interfaces/contact.interface';
import { NotificationsService } from '@app/services/notifications/notifications.service';

@Injectable({
	providedIn: 'root'
})

export class ContactsService {

	contacts;
	contacts$;

	constructor(private notificationsService: NotificationsService) {

	}

}