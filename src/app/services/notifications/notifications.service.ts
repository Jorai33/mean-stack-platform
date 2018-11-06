import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class NotificationsService {

	notifications: any[];

	constructor() {
		this.notifications = [
			{
				title: 'Notification One',
				description: 'This is notification one'
			},
			{
				title: 'Notification Two',
				description: 'This is notification two'
			},
			{
				title: 'Notification Three',
				description: 'This is notification three'
			}
		]
	}

}