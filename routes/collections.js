const express = require('express')
const router = express.Router()
const collectionCTRL = require('../controllers/collections')

router.get('/', collectionCTRL.allCollections)
router.get('/:id', collectionCTRL.userCollections)
router.delete(
  '/:collectionId/books/:bookId',
  collectionCTRL.removeBookFromCollection
)
router.post('/:collectionId/books/:bookId', collectionCTRL.addBookToCollection)

router.post('/', collectionCTRL.createCollection)

router.put("/:isbn", collectionCTRL.addToCollection)

module.exports = router

