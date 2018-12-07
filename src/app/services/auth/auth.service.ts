import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

import { NotificationsService } from '@app/services/notifications/notifications.service';

@Injectable({
	providedIn: 'root'
})

export class AuthService {

	uri = 'http://localhost:4000';
	
	jwtHelper = new JwtHelperService();
	
	constructor(private http: HttpClient, private router: Router, private notificationsService: NotificationsService) {
		
	}

	signIn(email, password) {
		const credentials = {
			email,
			password
		}

		this.http.post(`${this.uri}/login`, credentials).toPromise()
			.then(res => {
				this.setSession(res as any);
			})
			.catch(err => {
				this.notificationsService.createAlert(`Error signing in: ${err.statusText}`, 'Close');
			})
	}

	signOut() {
		this.token = null;
		this.user = null;
		localStorage.removeItem('token');
		localStorage.removeItem('user');

		this.router.navigateByUrl('login');
	}

	register(email, password) {
		const credentials = {
			email,
			password
		}

		this.http.post(`${this.uri}/register`, credentials).toPromise()
			.then(res => {
				this.setSession(res as any);
			})
			.catch(err => {
				this.notificationsService.createAlert(`Error registering user: ${err.message}`, 'Close');
			})
	}

	setSession({token, user}) {
		localStorage.setItem('token', token);
		localStorage.setItem('user', user);
		this.router.navigateByUrl('home');
		this.notificationsService.createAlert(`Signed in as ${user.email}`, null);
	}

	get tokenIsValid(): boolean {
		if (localStorage.getItem('token') && !this.jwtHelper.isTokenExpired(localStorage.getItem('token'))) {
			return true;
		} else {
			return false;
		}
	}

}