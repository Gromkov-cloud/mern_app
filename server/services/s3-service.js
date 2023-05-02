const AWS = require('aws-sdk');

S3Service = class {
    s3 = new AWS.S3({
        accessKeyId: 'YCAJEXjNkzVVIB7iIYOzcAHjE',
        secretAccessKey: 'YCMM8EYNfs3SpcEqg_JLLW51fEL3Qd1tZ1Oaqmk1',
        endpoint: 'storage.yandexcloud.net',
        sslEnabled: false
    });
}

module.exports = new S3Service()