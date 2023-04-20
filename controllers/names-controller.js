const Name = require("../models/names-model")

const throwError = (err, res) => {
    res.status(500).json(`Something goes wrong: ${err}`)
}

const addName = async (req, res) => {
    try {
        const name = new Name(req.body)
        const result = await name
            .save()
        res.status(200).json(result)
    } catch (error) {
        throwError(error, res)
    }
}

module.exports = {
    addName
}