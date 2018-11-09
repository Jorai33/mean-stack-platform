import { Injectable } from '@angular/core';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})

export class NotificationsService {

	notifications: any[];
      unreadNotifications: any[];
      selectedNotification;

	constructor(private router: Router) {
		this.notifications = [
			{
                        id: 1,
				title: 'Notification One',
                        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                        read: false
			},
			{
                        id: 2,
				title: 'Notification Two',
                        description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur/',
                        read: false
			},
			{
                        id: 3,
				title: 'Notification Three',
                        description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                        read: false
			}
            ]
            
            this.unreadNotifications = this.notifications.filter(notification => notification.read == false);
      }
      
      trackNotification(index, notification) {
            return notification ? notification.id : undefined;
      }

      markAllRead() {
            this.unreadNotifications = [];
      }

      viewNotification(notification) {
            this.selectedNotification = this.notifications.find(item => item.id == notification.id);
            this.selectedNotification.read = true;
            this.updateUnreadNotifications();
            this.router.navigateByUrl('/notifications');
      }

      updateUnreadNotifications() {
            this.unreadNotifications = this.notifications.filter(notification => !notification.read);
      }
      
}