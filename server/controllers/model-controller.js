const S3Service = require("../services/s3-service")
const fs = require('fs');

class ModelController {
    async getModel(req, res) {
        const modelId = req.params.id
        const readStream = S3Service.fetchModel(modelId, req, res)
        console.log(readStream)
        res.set({
            'Content-Type': 'application/octet-stream',
            'Content-Disposition': 'attachment; filename="file.txt"'
        });

        readStream.pipe(res);
    }
}

module.exports = new ModelController()