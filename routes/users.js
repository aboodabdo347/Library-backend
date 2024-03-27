var express = require('express')
var router = express.Router()
var User = require('../models/User')

router.get('/authors', async (req, res, next) => {
  try {
    const authors = await User.find({ role: 'author' })
    res.send(authors)
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: 'Error fetching authors', error: error })
  }
})

module.exports = router
