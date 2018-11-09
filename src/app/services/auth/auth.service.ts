import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root'
})

export class AuthService {
  
	isAuthenticated: boolean;

	constructor(private router: Router) {
		this.isAuthenticated = true;
	}

	signOut() {
		this.isAuthenticated = false;
		this.router.navigateByUrl('login');
	}

}