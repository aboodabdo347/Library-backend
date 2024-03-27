const Collection = require("../models/Collection")
const Book = require("../models/Book")
const axios = require("axios")

const addToCollection = async (req, res) => {
  let bookISBN = req.params.isbn
  let findBookInDb = await Book.findOne({ isbn: bookISBN })
  let findCollection = await Collection.findOne({ _id: req.body.collectionId })
  //   console.log(findCollection)
  //   console.log(findBookInDb)
  if (findBookInDb) {
    findCollection.books.push(findBookInDb._id)
    findCollection.save()
    // console.log(findCollection)
  } else {
    const bookRes = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=isbn:${bookISBN}&langRestrict=en&maxResults=40`
    )
    //   console.log(bookRes.data)
    if (
      !bookRes.totalItems == 1 &&
      bookRes.data.items[0].volumeInfo.title &&
      "imageLinks" in bookRes.data.items[0].volumeInfo &&
      bookRes.data.items[0].volumeInfo.description &&
      bookRes.data.items[0].volumeInfo.publishedDate &&
      bookRes.data.items[0].volumeInfo.authors &&
      bookRes.data.items[0].volumeInfo.language === "en" &&
      "industryIdentifiers" in bookRes.data.items[0].volumeInfo &&
      (bookRes.data.items[0].volumeInfo.industryIdentifiers[0].type ==
        "ISBN_10" ||
        bookRes.data.items[0].volumeInfo.industryIdentifiers[0].type ==
          "ISBN_13")
    ) {
      let newBook = await Book.create({
        title: bookRes.data.items[0].volumeInfo.title,
        image: bookRes.data.items[0].volumeInfo.imageLinks.thumbnail,
        description: bookRes.data.items[0].volumeInfo.description,
        pubYear: bookRes.data.items[0].volumeInfo.publishedDate,
        authors: bookRes.data.items[0].volumeInfo.authors,
        isbn: bookRes.data.items[0].volumeInfo.industryIdentifiers[0]
          .identifier,
      })
      findCollection.books.push(newBook._id)
      findCollection.save()
      // console.log("else")
      // console.log(findCollection)
    } else {
      console.log("book not found")
    }
  }
}

const allCollections = async (req, res) => {
  try {
    let allRes = await Collection.find().populate("books")
    res.json(allRes)
  } catch (error) {
    res.json({ error: error.message })
  }
}

const userCollections = async (req, res) => {
  let allRes = await Collection.find()
  console.log(allRes)
  if (!req.body._id) {
    try {
      let userCollRes = await Collection.find({ user: req.params.id }).populate(
        'books'
      )
      res.json(userCollRes)
    } catch (error) {
      res.json({ error: error.message })
    }
  } else {
    try {
      console.log(req.body._id)
      let userCollRes = await Collection.find({ _id: req.params.id }).populate(
        'books'
      )
      res.json(userCollRes)
    } catch (error) {
      res.json({ error: error.message })
    }
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
      return res.status(404).send({ message: "Collection not found" })
    }
    collection.books = collection.books.filter((id) => id.toString() !== bookId)
    await collection.save()

    res.send({ message: "Book removed from collection", collection })
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
      return res.status(400).json({ message: "Book already in the collection" })
    }
  } catch (error) {
    console.log(error)
  }
}
module.exports = {
  allCollections,
  userCollections,
  createCollection,
  addToCollection,
  removeBookFromCollection,
  addBookToCollection,
}
