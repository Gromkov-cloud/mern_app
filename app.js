const express = require("express")
const mongoose = require("mongoose")

require("path")
require('dotenv').config();

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const list = ["vasiliy", "anton", "salavat"]

app.post("/post", (req, res) => {
    list.push(req.body.name)
    res.status(200).json("ok")
})

app.get("/list", (req, res) => {
    res.json(list)
})

async function start() {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        app.listen(process.env.PORT, () => { console.log(`App has been started PORT=${process.env.PORT}`) })
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}
start()