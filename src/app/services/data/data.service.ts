import { Injectable } from '@angular/core';
import * as AWS from 'AWS-sdk';
import { Observable } from 'rxjs';
import credentials from '@config/credentials.json';

@Injectable({
	providedIn: 'root'
})

export class DataService {

	dynamodb;
	docClient;

	constructor() {
		AWS.config.credentials = new AWS.Credentials(credentials.accessKeyId, credentials.secretAccessKey, null);
		AWS.config.update({
			region: 'eu-west-1'
		})

		this.dynamodb = new AWS.DynamoDB();
		this.docClient = new AWS.DynamoDB.DocumentClient();
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
					resolve(data.Item);
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