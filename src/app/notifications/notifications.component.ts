import { Component, OnInit } from '@angular/core';
import { NotificationsService } from '@app/services/notifications/notifications.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})

export class NotificationsComponent implements OnInit {

	selectedNotification;

	constructor(public notifs: NotificationsService) {
		this.selectedNotification = notifs.selectedNotification;
	}
	
	ngOnInit() {
	
	}

}
