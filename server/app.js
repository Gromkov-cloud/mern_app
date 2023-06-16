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

app.use(express.json({ limit: "100mb" }))
app.use(express.urlencoded({ extended: true, limit: "100mb" }))
app.use(cookieParser())


//ROUTES
const modelRoute = require("./routes/model-router")
const imageRoute = require("./routes/image-router")
const authRoute = require("./routes/auth-router")


app.use(modelRoute)
app.use(imageRoute)
app.use("/api", authRoute)