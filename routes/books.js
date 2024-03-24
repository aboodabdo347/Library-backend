const express = require('express')
const router = express.Router()
const middleware = require('../middleware')

const bookCtrl = require('../controllers/books')
router.get('/', bookCtrl.getBooks)
router.get('/:id', bookCtrl.getBook)
router.post(
  '/add',
  middleware.stripToken,
  middleware.verifyToken,
  bookCtrl.createBook
)
router.delete(
  '/:id',
  middleware.stripToken,
  middleware.verifyToken,
  bookCtrl.deleteBook
)
router.put(
  '/:id',
  middleware.stripToken,
  middleware.verifyToken,
  bookCtrl.updateBook
)
module.exports = router
