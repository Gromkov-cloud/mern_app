const express = require("express")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
require('dotenv').config()

const app = express()

const appStart = async () => {
    try {
        await mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
        console.log(`Db is successful connected`)
        await app.listen(process.env.PORT)
        console.log(`App has been started on PORT=${process.env.PORT}`)
    } catch (error) {
        console.log(`Something goes wrong: ${error}`)
    }
}
appStart()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())


//ROUTES
const modelRoute = require("./routes/model-router")


// app.use(modelRoute)


















const AWS = require('aws-sdk');

app.get("/model/:id", (req, res) => {
    const s3 = new AWS.S3({
        accessKeyId: 'YCAJEXjNkzVVIB7iIYOzcAHjE',
        secretAccessKey: 'YCMM8EYNfs3SpcEqg_JLLW51fEL3Qd1tZ1Oaqmk1',
        endpoint: 'storage.yandexcloud.net',
        sslEnabled: false
    });
    console.log(req.params)
    const params = {
        Bucket: 'ar-app-bucket-v.gromkov',
        Key: req.params.id
    };

    const readStream = s3.getObject(params).createReadStream();

    readStream.on('data', (data) => {
        res.write(data);
    });

    readStream.on('end', () => {
        res.end();
    });
})  