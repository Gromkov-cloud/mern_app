const mongoose = require("mongoose")
const Schema = mongoose.Schema

const models = new Schema({
    name: String,
    fileName: String,
    date: Date,
    description: String,
    size: Number,
    isActive: Boolean,
    s3: {
        model: String,
        image: String
    },
})

const model = mongoose.model("model", models)

module.exports = model