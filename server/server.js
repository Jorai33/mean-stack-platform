const config = require('./config');
const aws = require('aws-sdk');

aws.config.loadFromPath('./server/credentials.json');

const s3 = new aws.S3();
const docClient = new aws.DynamoDB.DocumentClient();
var dynamodb = new aws.DynamoDB();


// Create table
exports.createTable = async function(tableName) {

    const params = {
        TableName: tableName,
        AttributeDefinitions: [
            {
                AttributeName: 'id',
                AttributeType: 'S'
            }
        ],
        KeySchema: [
            {
                AttributeName: 'id',
                KeyType: 'HASH'
            }
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5
        }
    }

    return new Promise((resolve, reject) => {
        dynamodb.createTable(params, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        })
    })
}


// GET all from table
exports.get = async function(tableName) {

    const params = {
        TableName: tableName
    }

    return new Promise((resolve, reject) => {
        dynamodb.scan(params, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        })
    })
}


// GET item from table by ID
exports.getItem = async function(tableName, itemId) {

    const params = {
        TableName: tableName,
        Key: {
            id: itemId
        }
    }

    return new Promise((resolve, reject) => {
        docClient.get(params, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        })
    })
}


// PUT item into table
exports.put = async function(tableName, item) {

    const params = {
        TableName: tableName,
        Item: {...item}
    }

    return new Promise((resolve, reject) => {
        docClient.put(params, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        })
    })
}


// DELETE item from table
exports.delete = async function(tableName, itemId) {

    const params = {
        TableName: tableName,
        Key: {
            id: itemId
        }
    }

    return new Promise((resolve, reject) => {
        docClient.delete(params, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        })
    })
}