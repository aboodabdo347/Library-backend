const express = require("express")
const router = express.Router()
const collectionCTRL = require("../controllers/collections")

router.get("/", collectionCTRL.allCollections)
router.get("/:id", collectionCTRL.userCollections)

router.post("/", collectionCTRL.createCollection)

module.exports = router