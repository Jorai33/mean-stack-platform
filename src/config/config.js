var credentials = require('./credentials.json');

module.exports = {
    aws_local_config: {
        region: 'local',
        endpoint: 'http://localhost:3036'
    },
    aws_remote_config: {
        accessKeyId: credentials.accessKeyId,
        secretAccessKey: credentials.secretAccessKey,
        region: 'eu-west-1',
    }
}