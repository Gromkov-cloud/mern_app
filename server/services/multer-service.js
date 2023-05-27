const multer = require("multer");
const multerS3 = require('multer-s3');
const S3Service = require("./s3-service")

require('dotenv').config()

class Multer {
    upload = multer({
        storage: multerS3({
            s3: S3Service.s3,
            bucket: process.env.S3_BUCKET_NAME,
            key: function (req, file, cb) {
                cb(null, Date.now() + "-" + file.originalname);
            },
            metadata: function (req, file, cb) {
                cb(null, {
                    originalname: file.originalname,
                    uploadDate: new Date().toISOString(),
                    fileType: file.mimetype
                });
            }
        })
    });
}


module.exports = new Multer

