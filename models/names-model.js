const mongoose = require("mongoose")
const Schema = mongoose.Schema

const nameSchema = new Schema({
    name: String,
    age: Number
})

const Name = mongoose.model("names", nameSchema)

module.exports = Name