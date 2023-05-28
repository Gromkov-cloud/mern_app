const mongoose = require("mongoose")
const Schema = mongoose.Schema

const images = new Schema({
    s3Name: String,
})

const model = mongoose.model("images", images)

module.exports = model