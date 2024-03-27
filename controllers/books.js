const Book = require('../models/book')
const axios = require('axios')
const User = require('../models/User')

const searchBooksApi = async (req, res) => {
  let term = req.body.term
  let resultsArray = []
  // console.log(term)
  let searchRes = await axios.get(
    `https://www.googleapis.com/books/v1/volumes?q='${term}'&langRestrict=en&maxResults=40`
  )
  // res.json(searchRes.data);
  // console.log(searchRes.data.items.length)
  // console.log(searchRes.data.items[0].volumeInfo.imageLinks.thumbnail)
  try {
    for (let i = 0; i < searchRes.data.items.length; i++) {
      if (
        searchRes.data.items[i].volumeInfo.title &&
        'imageLinks' in searchRes.data.items[i].volumeInfo &&
        searchRes.data.items[i].volumeInfo.description &&
        searchRes.data.items[i].volumeInfo.publishedDate &&
        searchRes.data.items[i].volumeInfo.authors &&
        searchRes.data.items[i].volumeInfo.language === 'en' &&
        'industryIdentifiers' in searchRes.data.items[i].volumeInfo &&
        (searchRes.data.items[i].volumeInfo.industryIdentifiers[0].type ==
          'ISBN_10' ||
          searchRes.data.items[i].volumeInfo.industryIdentifiers[0].type ==
            'ISBN_13')
      ) {
        resultsArray.push({
          title: searchRes.data.items[i].volumeInfo.title,
          image: searchRes.data.items[i].volumeInfo.imageLinks.thumbnail,
          description: searchRes.data.items[i].volumeInfo.description,
          pubYear: searchRes.data.items[i].volumeInfo.publishedDate,
          authors: searchRes.data.items[i].volumeInfo.authors,
          isbn: searchRes.data.items[i].volumeInfo.industryIdentifiers[0]
            .identifier
        })
      }
    }
  } catch (error) {
    res.json({ error: error.message })
  }

  res.json(resultsArray)
}

const getBooks = async (req, res) => {
  try {
    const books = await Book.find({})
    res.send(books)
  } catch (error) {
    console.log(error)
  }
}

const getBook = async (req, res) => {
  console.log(req.params.id)
  try {
    const book = await Book.findById(req.params.id)
    res.send(book)
  } catch (error) {
    console.log(error)
  }
}
// const createBook = async (req, res) => {
//   try {
//     const book = await Book.create(req.body)
//     res.send(book)
//   } catch (error) {
//     console.log(error)
//   }
// }

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
const createBook = async (req, res) => {
  const { title, image, isbn, authors, description, pubYear } = req.body
  console.log(authors)
  try {
    const newBook = new Book({
      title,
      image,
      isbn,
      authors,
      description,
      pubYear
    })

    const savedBook = await newBook.save()
    for (let i = 0; i < authors.length - 1; i++) {
      await User.updateOne(
        { _id: authors[i] },
        { $addToSet: { books: savedBook._id } }
      )
    }

    res.status(201).json(savedBook)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error creating book', error })
  }
}
module.exports = {
  getBooks,
  getBook,
  createBook,
  deleteBook,
  updateBook,
  searchBooksApi
}
