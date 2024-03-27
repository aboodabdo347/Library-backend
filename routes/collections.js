const express = require("express")
const router = express.Router()
const collectionCTRL = require("../controllers/collections")

router.get("/:id", collectionCTRL.userCollections)

router.get("/", collectionCTRL.allCollections)

router.post("/", collectionCTRL.createCollection)

router.put("/:isbn", collectionCTRL.addToCollection)

router.delete("/:id" , collectionCTRL.deleteCollection)

router.get("/c/:id" , collectionCTRL.getAcollection)

module.exports = router