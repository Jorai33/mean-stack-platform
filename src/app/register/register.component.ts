import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import fetch from 'node-fetch';
import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';
import { AuthService } from '@app/services/auth/auth.service';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {

	email: string;
	password: string;
	confirmationCode: string;

	constructor(private auth: AuthService, public router: Router) {
		
	}

	ngOnInit() {

	}
	
}