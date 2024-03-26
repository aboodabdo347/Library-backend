const mongoose = require("mongoose")
const Schema = mongoose.Schema

const bookSchema = new Schema(
  {
    title: String,
    image: String,
    isbn: String,
    authors: [{ type: Schema.Types.ObjectId, ref: "Author" }],
    description: String,
    pubYear: Number,
  },
  {
    timestamps: true,
  }
)

const Book = mongoose.model("Book", bookSchema)

module.exports = Book
