const S3Service = require("../services/s3-service")
const Model = require("../models/model-model");
const s3Service = require("../services/s3-service");
var ObjectId = require('mongodb').ObjectId;
require('dotenv').config()


const pickFiles = (files, reqBody) => {
    // возвращает тело запроса с свойством s3 где записываются файлы,
    // которые были изменены(которые пришли с клиента)
    // в случае если файлы не были изменены, то есть req.files пустой
    // то тело запроса не будет изменено

    if (files.length) {
        const s3Files = {}

        files.forEach(file => {
            if (file.metadata.fileType == "application/octet-stream") {
                const model = {
                    "fileName": file.originalname,
                    "size": file.size,
                    "s3Name": file.key
                }
                s3Files.model = { ...model }
            } else {
                const qr = {
                    "fileName": file.originalname,
                    "s3Name": file.key
                }
                s3Files.qr = { ...qr }
            }
        });
        reqBody.s3 = { ...s3Files }
        return reqBody
    } else {
        return reqBody
    }

}
const getDeleteParams = (modelFileNames) => {
    modelFileNames = { ...modelFileNames }
    const params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Delete: {
            Objects: [],
        },
    }

    for (const key in modelFileNames) {
        if (modelFileNames[key]) {
            params.Delete.Objects.push({ Key: modelFileNames[key] })
        }
    }

    return params
}

const getModelDTO = (reqBody, oldData) => {
    const modelDTO = JSON.parse(JSON.stringify(oldData))

    if (reqBody.modelName) { modelDTO.name = reqBody.modelName }
    if (reqBody.description) { modelDTO.description = reqBody.description }
    if (reqBody.isActive) { modelDTO.isActive = reqBody.isActive }
    if (reqBody.s3) {
        if (reqBody.s3.model) {
            modelDTO.fileName = reqBody.s3.model.fileName
            modelDTO.size = reqBody.s3.model.size
            modelDTO.s3.model = reqBody.s3.model.s3Name
        }
        if (reqBody.s3.image) {
            modelDTO.imageName = reqBody.s3.image.fileName
            modelDTO.s3.image = reqBody.s3.image.s3Name
        }
    }

    return modelDTO
}

const getDeleteOptions = (data, oldData) => {
    const objects = []

    if (data.s3.model) {
        objects.push({ "Key": oldData.s3.model })
    }
    if (data.s3.image) {
        objects.push({ "Key": oldData.s3.image })
    }

    return {
        Bucket: process.env.S3_BUCKET_NAME,
        Delete: { "Objects": objects, Quiet: false }
    }
}


class ModelController {

    async getModel(req, res) {

        const model = await Model.findById(req.params.id)
        console.log(model)

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
    async getModels(req, res) {
        const filters = req.query
        const models = await Model.find(filters)
        res.status(200).json(models)
    }
    async postModel(req, res) {
        const modelDto = {
            name: req.body.modelName,
            fileName: req.files[0].originalname,
            imageName: req.files[1]?.originalname || null,
            date: new Date(),
            description: req.body.description || null,
            size: req.files[0].size,
            isActive: true,
            s3: {
                model: req.files[0].key,
                image: null,
                qr: req.files[1].key
            }
        }
        const model = new Model(modelDto)
        const result = await model.save()
        res.status(200).json({ "result": result })
    }
    // async updateModel(req, res) {

    //     const oldModel = await Model.findById(req.body.id)
    //     const data = pickFiles(req.files, req.body)
    //     const modelDto = getModelDTO(data, oldModel)
    //     modelDto.updateDate = new Date()

    //     const result = await Model.updateOne({ "_id": new ObjectId(req.body.id) }, modelDto)

    //     if (data.s3) {
    //         s3Service.s3.deleteObjects(getDeleteOptions(data, oldModel), function (err, data) {
    //             if (data) {
    //                 console.log("File successfully deleted", data);
    //             } else {
    //                 console.log("Check with error message " + err);
    //             }
    //         });
    //     }

    //     res.json(result)
    // }

    async updateModel(req, res) {
        res.json({ "missage": "sosa" })
    }

    async deleteModel(req, res) {
        const id = req.params.id

        const model = await Model.findById(id)
        if (!model) {
            res.json("такой модели не найдено")
        }

        const deletedModel = await Model.deleteOne({ _id: id })

        S3Service.s3.deleteObjects(getDeleteParams(model.s3), (err, data) => {
            if (err) {
                console.log(err, err.stack);
                res.status(500).json('Произошла ошибка при удалении файлов');
            } else {
                res.json('Файлы успешно удалены!');
            }
        });
        res.status(200)
    }

    async getModelInfo(req, res) {
        const id = req.params.id
        const info = await Model.findById(id)
        console.log(info)
        res.status(200).json(info)
    }

    async getModelQr(req, res) {
        const model = await Model.findById(req.params.id)
        console.log(model)

        const params = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: model.s3.qr
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

module.exports = new ModelController()