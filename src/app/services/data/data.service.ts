import { Injectable } from '@angular/core';
import * as aws from 'aws-sdk';
import { Observable } from 'rxjs';
import credentials from '../../../../server/credentials.json';

@Injectable({
	providedIn: 'root'
})

export class DataService {

	dynamodb;
	docClient;

	constructor() {
		aws.config.credentials = new aws.Credentials(credentials.accessKeyId, credentials.secretAccessKey, null);
		aws.config.update({
			region: 'eu-west-1'
		})

		this.dynamodb = new aws.DynamoDB();
		this.docClient = new aws.DynamoDB.DocumentClient();
	}
	
	async getItems(tableName) {
		const params = {
			TableName: tableName
		}

		return new Promise((resolve, reject) => {
			this.docClient.scan(params, (err, data) => {
				if (err) {
					reject(err);
				} else {
					resolve(data.Items);
				}
			})
		})
	}

	async getItem(tableName, itemId) {
		const params = {
			TableName: tableName,
			Key: {
				id: itemId
			}
		}

		return new Promise((resolve, reject) => {
			this.docClient.get(params, (err, data) => {
				if (err) {
					reject(err);
				} else {
					resolve(data);
				}
			})
		})
	}

	async putItem(tableName, item) {
		const params = {
			TableName: tableName,
			Item: {...item}
		}

		return new Promise((resolve, reject) => {
			this.docClient.put(params, (err, res) => {
				if (err) {
					reject(err);
				} else {
					resolve(res);
				}
			})
		})
	}

	async deleteItem(tableName, itemId) {
		const params = {
			TableName: tableName,
			Key: {
				id: itemId
			}
		}
	
		return new Promise((resolve, reject) => {
			this.docClient.delete(params, (err, res) => {
				if (err) {
					reject(err);
				} else {
					resolve(res);
				}
			})
		})
	}

}