const Book = require('../models/book')

const getBooks = async (req, res) => {
  try {
    const books = await Book.find({})
    res.send(books)
  } catch (error) {
    console.log(error)
  }
}
const getBook  = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
    res.send(book)
  } catch (error) {
    console.log(error)
  }
}
const createBook = async (req, res) => {
  try {
    const book = await Book.create(req.body)
    res.send(book)
  } catch (error) {
    console.log(error)
  }
}

const deleteBook = async (req, res) => {
  try {
    await Book.deleteOne({ _id: req.params.id })
    res.send({ msg: 'Post Deleted', status: 'Ok' })
  } catch (error) {
    console.log(error)
  }
}

const updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body)
    res.send(book)
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  getBooks,
  getBook,
  createBook,
  deleteBook,
  updateBook
}