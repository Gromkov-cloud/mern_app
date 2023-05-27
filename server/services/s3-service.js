const AWS = require('aws-sdk');
require('dotenv').config()

S3Service = class {
    s3 = new AWS.S3({
        accessKeyId: process.env.S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
        endpoint: process.env.S3_ENDPOINT,
        sslEnabled: false
    });
}

module.exports = new S3Service()