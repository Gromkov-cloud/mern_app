const S3Service = require("../services/s3-service")
const Model = require("../models/model-model")
require('dotenv').config()

class ModelController {
    async getModels(req, res) {
        const models = await Model.find()
        res.status(200).json(models)
    }

    async getModelInfo(req, res) {
        const id = req.params.id
        const info = await Model.findById(id)
        console.log(info)
        res.status(200).json(info)
    }

    async getModel(req, res) {

        const model = await Model.findById(req.params.id)

        const params = {
            Bucket: 'ar-app-bucket-v.gromkov',
            Key: model.s3.model
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
            name: req.body.name.replace(/"/g, ""),
            s3: {
                model: req.file.key
            }
        }
        const model = new Model(modelDto)
        await model.save()
        console.log(`модель загружена ${req.file.key}`)
        res.status(200).json(`модель загружена ${req.file}`)
    }

    async deleteModel(req, res) {
        const id = req.params.id

        const model = await Model.findOne({ _id: id })
        const deletedModel = await Model.deleteOne({ _id: id })
        const key = model.s3.model

        const params = {
            Bucket: process.env.BUCKET_NAME,
            Key: key,
        };
        S3Service.s3.deleteObject(params, (err, data) => {
            if (err) {
                console.log(err, err.stack);
                res.status(500).json('Произошла ошибка при удалении файла');
            } else {
                res.json('Файл успешно удален!');
            }
        });
    }
}

module.exports = new ModelController()