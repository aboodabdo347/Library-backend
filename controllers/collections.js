const Collection = require('../models/collection')
const Book = require('../models/book')

const allCollections = async (req, res) => {
  try {
    let allRes = await Collection.find()
    res.json(allRes)
  } catch (error) {
    res.json({ error: error.message })
  }
}

const userCollections = async (req, res) => {
  try {
    let userCollRes = await Collection.find({ _id: req.params.id })
    res.json(userCollRes)
  } catch (error) {
    res.json({ error: error.message })
  }
}

const createCollection = async (req, res) => {
  try {
    let collCreateRes = await Collection.create(req.body)
    res.json(collCreateRes)
  } catch (error) {
    res.json({ error: error.message })
  }
}
const removeBookFromCollection = async (req, res) => {
  const { collectionId, bookId } = req.params

  try {
    const collection = await Collection.findById(collectionId)

    if (!collection) {
      return res.status(404).send({ message: 'Collection not found' })
    }
    collection.books = collection.books.filter((id) => id.toString() !== bookId)
    await collection.save()

    res.send({ message: 'Book removed from collection', collection })
  } catch (error) {
    console.log(error)
  }
}
const addBookToCollection = async (req, res) => {
  const { collectionId, bookId } = req.params

  try {
    const collection = await Collection.findById(collectionId)
    const book = await Book.findById(bookId)

    if (!collection.books.includes(bookId)) {
      collection.books.push(bookId)
      await collection.save()
      return res.status(200).json(collection)
    } else {
      return res.status(400).json({ message: 'Book already in the collection' })
    }
  } catch (error) {
    console.log(error)
  }
}
module.exports = {
  allCollections,
  userCollections,
  createCollection,
  removeBookFromCollection,
  addBookToCollection
}
