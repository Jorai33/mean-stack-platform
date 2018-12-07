import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/services/auth/auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

	email: String;
	password: String;

	constructor(public auth: AuthService, private router: Router) {
		
	}

	ngOnInit() {
		if (this.auth.tokenIsValid) {
			this.router.navigateByUrl('home');
		}
	}

	signIn(email, password) {
		this.auth.signIn(email, password);
	}

}