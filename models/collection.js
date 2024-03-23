const mongoose = require("mongoose")
const Schema = mongoose.Schema

const collectionSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  books: [{ type: Schema.Types.ObjectId, ref: "Book" }],
  title: String,
})

const Collection = mongoose.model("Collection", collectionSchema)

module.exports = Collection
