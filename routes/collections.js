const express = require("express")
const router = express.Router()
const collectionCTRL = require("../controllers/collections")

router.get("/:id", collectionCTRL.userCollections)

router.get("/", collectionCTRL.allCollections)

router.post("/", collectionCTRL.createCollection)

module.exports = router