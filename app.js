const express = require("express")
const mongoose = require("mongoose")
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const cookieParser = require('cookie-parser');


const PORT = 3000
const DbUrl = "mongodb+srv://Vasiliy-The-Creator:Qe7g6P9IIwTdpz36@cluster0.3xjtnc7.mongodb.net/testDb?retryWrites=true&w=majority"

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// Routes
const movieRoutes = require("./routes/movie-routes")
const nameRoutes = require("./routes/name-routes")
const authRoutes = require("./routes/auth-routes")

const { authMiddleware, checkRole } = require("./middleware")
const User = require("./models/user-model")

const appStart = async () => {
    try {
        await mongoose.connect(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
        console.log(`Db is successful connected`)
        await app.listen(PORT)
        console.log(`App has been started on PORT=${PORT}`)
    } catch (error) {
        console.log(`Something goes wrong: ${error}`)
    }
}
appStart()

app.use(movieRoutes)
app.use(nameRoutes)
app.use(authRoutes)
app.get("/users", authMiddleware, checkRole("ADMIN"), async (req, res) => {
    try {
        const users = await User.find()
        console.log("adadawd")
        res.json(users)
    } catch (error) {
        res.json(error)
    }

})

const s3 = new AWS.S3({
    accessKeyId: 'YCAJEXjNkzVVIB7iIYOzcAHjE',
    secretAccessKey: 'YCMM8EYNfs3SpcEqg_JLLW51fEL3Qd1tZ1Oaqmk1',
    endpoint: 'storage.yandexcloud.net',
});

const upload = multer({
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

app.post('/upload', upload.single('file'), function (req, res, next) {
    res.status(200).json(`File: ${req.file.originalname} has been uploaded`)
});
