const config = require('./config');
const aws = require('aws-sdk');

aws.config.loadFromPath('./server/credentials.json');

const s3 = new aws.S3();
const docClient = new aws.DynamoDB.DocumentClient();
var dynamodb = new aws.DynamoDB();


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
                const { Items } = data;
                resolve(Items);
            }
        })
    })
}


// GET item from table by ID
exports.getById = async function(tableName, itemId) {

    const params = {
        TableName: tableName,
        KeyConditionExpression: 'invoiceId = :i',
        ExpressionAttributeValues: {
            ':i': itemId
        }
    }

    return new Promise((resolve, reject) => {
        docClient.query(params, (err, data) => {
            if (err) {
                reject(err);
            } else {
                const { Items } = data;
                resolve(Items);
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