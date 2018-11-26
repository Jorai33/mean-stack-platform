import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as AWS from 'AWS-sdk';
import { CognitoIdentityCredentials } from 'AWS-sdk';
import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';
import credentials from '@config/credentials.json';

@Injectable({
	providedIn: 'root'
})

export class AuthService {

	user: AmazonCognitoIdentity.CognitoUser;

    userPool;
    userData;
  
	// TODO: TEMP
	isAuthenticated: boolean;
	// isAuthenticated: boolean;

	constructor(private router: Router) {
        const poolData = {
            UserPoolId: 'eu-west-1_TJD6cDGjV',
            ClientId: credentials.appClientId
		}
		
		this.userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
		
		// TODO:
		// if (this.user) {
		// 	this.isAuthenticated = true;
		// } else {
		// 	this.isAuthenticated = false;
		// }
		this.isAuthenticated = true;
	}

	signIn(email, password) {
		const authDetails = new AmazonCognitoIdentity.AuthenticationDetails({
			Username: email,
			Password: password
		})

		const userData = {
			Username: email,
			Pool: this.userPool
		}

		const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

		cognitoUser.authenticateUser(authDetails, {
			onSuccess: function(res) {
				const accessToken = res.getAccessToken().getJwtToken();

				AWS.config.credentials = new AWS.CognitoIdentityCredentials({
					IdentityPoolId: this.userPool.UserPoolId,
					Logins: {
						'cognito-idp.eu-west-1.amazonaws.com/eu-west-1_TJD6cDGjV': res.getIdToken().getJwtToken()
					}
				})
				
				// TODO:
				// AWS.config.credentials.refresh(err => {
					
				// })
			},
			onFailure: function(err) {
				// TODO:
				return err;
			}
		})
	}

	signOut() {
		this.isAuthenticated = false;
		this.router.navigateByUrl('login');
	}

}
