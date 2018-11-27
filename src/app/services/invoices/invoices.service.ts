import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';

import Invoice from '@app/interfaces/invoice.interface';
import { NotificationsService } from '@app/services/notifications/notifications.service';

@Injectable({
	providedIn: 'root'
})

export class InvoicesService {

	constructor(private notificationsService: NotificationsService) {

	}

}