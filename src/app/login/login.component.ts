import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/services/auth/auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

	email: String;
	password: String;

	constructor(public auth: AuthService) {
		
	}

	openDialog() {
		
	}

	ngOnInit() {

	}

}