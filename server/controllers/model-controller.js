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
            Bucket: process.env.S3_BUCKET_NAME,
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
            fileName: req.files[0].originalname,
            imageName: req.files[1].originalname,
            date: new Date(),
            description: req.body.description,
            size: req.files[0].size,
            isActive: true,
            s3: {
                model: req.files[0].key,
                image: req.files[1].key
            }
        }
        const model = new Model(modelDto)
        const result = await model.save()
        res.status(200).json({ "result": result })
    }

    async deleteModel(req, res) {
        const id = req.params.id

        const model = await Model.findById(id)
        if (!model) {
            res.json("такой модели не найдено")
        }

        const deletedModel = await Model.deleteOne({ _id: id })
        const deleteImage = await Model.deleteOne({ s3Name: model.s3.image })

        const params = {
            Bucket: process.env.S3_BUCKET_NAME,
            Delete: {
                Objects: [{ Key: model.s3.model }, { Key: model.s3.image }]
            }
        };
        S3Service.s3.deleteObjects(params, (err, data) => {
            if (err) {
                console.log(err, err.stack);
                res.status(500).json('Произошла ошибка при удалении файлов');
            } else {
                res.json('Файлы успешно удалены!');
            }
        });
    }
}

module.exports = new ModelController()