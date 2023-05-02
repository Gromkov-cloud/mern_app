const S3Service = require("../services/s3-service")
const Model = require("../models/model-model")

class ModelController {
    async getModel(req, res) {
        const params = {
            Bucket: 'ar-app-bucket-v.gromkov',
            Key: req.params.id
        };

        const readStream = S3Service.s3.getObject(params).createReadStream();

        readStream.on('data', (data) => {
            res.write(data);
        });

        readStream.on('end', () => {
            res.end();
        });
    }

    async postModel(req, res) {
        const modelDto = {
            name: req.body.name,
            s3: {
                model: req.file.key
            }
        }
        const model = new Model(modelDto)
        await model.save()
        console.log(`модель загружена ${req.file.key}`)
        res.status(200).json(`модель загружена ${req.file}`)
    }
}

module.exports = new ModelController()