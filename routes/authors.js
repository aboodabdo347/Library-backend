const express = require("express")
const router = express.Router()
const authorCTRL = require("../controllers/authors")

router.get("/", authorCTRL.allAuthors)

module.exports = router