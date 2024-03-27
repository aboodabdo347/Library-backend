
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: String,
  image: String,
  isbn: String,
  authors: Array,
  description: String,
  pubYear: String
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
