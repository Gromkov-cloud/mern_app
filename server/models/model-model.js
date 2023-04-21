const mongoose = require("mongoose")
const Schema = mongoose.Schema

const models = new Schema({
    name: String,
    s3Url: String,
})

const model = mongoose.model("model", models)

module.exports = model