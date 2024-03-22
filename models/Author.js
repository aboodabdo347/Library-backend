const mongoose = require("mongoose")
const Schema = mongoose.Schema

const authorSchema = new Schema({
    name: String,
    image: String,
    books: [Schema.Types.ObjectId]
})

module.exports = mongoose.model("Author", authorSchema)