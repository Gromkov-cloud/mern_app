const S3Service = require("../services/s3-service")
const Image = require("../models/image-model")

class ImageController {
    async getImage(req, res) {
        const image = await Image.findOne({ "s3Name": req.params.id })
        console.log(image)

        if (!image) {
            res.json(`Картинки с таким названием: ${req.params.id} не существует`)
        }

        const params = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: image.s3Name
        };

        const readStream = S3Service.s3.getObject(params).createReadStream();

        readStream.on('data', (data) => {
            res.write(data);
        });

        readStream.on('end', () => {
            res.end();
        });
    }
}

module.exports = new ImageController()