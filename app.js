const express = require("express")
const mongoose = require("mongoose")

require("path")
require('dotenv').config();

const app = express()

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