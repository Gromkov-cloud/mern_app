const Movies = require("../models/movies")

const throwError = (err) => {
    res.status(500).json(`Something goes wrong: ${err}`)
}

const getMovies = async (req, res) => {
    try {
        const movies = await Movies
            .find()
            .sort({ rating: -1 })

        res.status(200).json(movies)
    }
    catch (err) {
        throwError(err)
    }
}

const getMovie = async (req, res) => {
    try {
        const movie = await Movies
            .findById(req.params.id)

        res.status(200).json(movie)
    } catch (error) {
        throwError(err)
    }
}

module.exports = {
    getMovies,
    getMovie
}