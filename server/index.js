const express = require("express")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
const cors = require("cors")
require('dotenv').config()
const path = require("path")

const app = express()

app.use(express.json({ limit: "100mb" }))
app.use(express.urlencoded({ extended: true, limit: "100mb" }))
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: "http://localhost:5173"
}))

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

//ROUTES
const modelRoute = require("./routes/model-router")
const imageRoute = require("./routes/image-router")
const authRoute = require("./routes/auth-router")
const errorMiddleware = require("./middleware/error-middleware")

app.use("/api", modelRoute)
app.use(imageRoute)
app.use("/api", authRoute)
// app.use("/", (req, res) => { res.json("hello vercel, it is simple route") })

app.use(express.static(path.join(__dirname, "../client/dist")))
app.get("*", (req, res) => {
    try {
        res.sendFile(path.join(__dirname, "../client/dist/index.html"), (err) => {
            console.log(err)
        })
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

app.use(errorMiddleware)