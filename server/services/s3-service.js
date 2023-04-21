const AWS = require('aws-sdk');
const { Model } = require('mongoose');
const fs = require('fs');



S3Service = class {
    async uploadModel() {
        multer({
            storage: multerS3({
                s3: s3,
                bucket: 'ar-app-bucket-v.gromkov',
                acl: 'public-read',
                metadata: function (req, file, cb) {
                    cb(null, { fieldName: file.fieldname });
                },
                key: function (req, file, cb) {
                    cb(null, "test/" + Date.now() + file.originalname)
                }
            })
        });
    }

    async fetchModel(id) {

        const s3 = new AWS.S3({
            accessKeyId: 'YCAJEXjNkzVVIB7iIYOzcAHjE',
            secretAccessKey: 'YCMM8EYNfs3SpcEqg_JLLW51fEL3Qd1tZ1Oaqmk1',
            endpoint: 'storage.yandexcloud.net',
            sslEnabled: false
        });
        const params = {
            Bucket: 'ar-app-bucket-v.gromkov',
            Key: "mern.png"
        };


        // const model = s3.getObject(params, (err, data) => {
        //     if (err) {
        //         console.log('Error downloading file:', err);
        //     } else {
        //         console.log('File content type:', data.ContentType);
        //         // console.log('File content length:', data.ContentLength);
        //         // console.log('File content:', data.Body.toString());
        //         return data.ContentType
        //     }
        // });

        const stream = s3.getObject(params).createReadStream();

        return stream
    }

}

module.exports = new S3Service()