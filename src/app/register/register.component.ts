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

	fetch;
	attributes: AmazonCognitoIdentity.CognitoUserAttribute[];

	email: string;
	password: string;
	confirmationCode: string;

	constructor(private auth: AuthService, public router: Router) {
		this.attributes = [];
		this.fetch = fetch;
	}

	ngOnInit() {

	}

	register() {
		this.attributes.push(new AmazonCognitoIdentity.CognitoUserAttribute({
			Name: 'email',
			Value: this.email
		}))

		this.auth.userPool.signUp(this.email, this.password, this.attributes, null, function(err, res) {
			if (err) {
				alert(err.message || JSON.stringify(err));
				return;
			} else {
				console.log('Username is' + res.getUsername());
			}
		})
	}

	confirmRegistration() {
		const userData = {
			Username: this.email,
			Pool: this.auth.userPool
		}

		const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

		cognitoUser.confirmRegistration(this.confirmationCode, true, function(err, res) {
			if (err) {
				alert(`Error confirming registration: ${err.message}`);
				console.error('Error confirming registration:', err);
			} else {
				console.log('User registration confirmed', res);
				this.auth.user = cognitoUser;
			}
		})
	}

	resendConfirmationCode() {
		const userData = {
			Username: this.email,
			Pool: this.auth.userPool
		}

		const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

		cognitoUser.resendConfirmationCode(function(err, res) {
			if (err) {
				alert(err.message || JSON.stringify(err));
				console.log('Error sending confirmation code:', err);
			} else {
				console.log(`Re-sent confirmation code to email address '${this.email}'`);
			}
		})
	}

}