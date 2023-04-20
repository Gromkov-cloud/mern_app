const express = require("express")
const router = express.Router()

const { getMovies, getMovie } = require("../controllers/movies-controller")

router.get("/movies", getMovies)
router.get("/movies/:id", getMovie)
router.delete("/movies/:id", () => { })
router.post("/movies", () => { })
router.patch("/movies/:id", () => { })

module.exports = router


