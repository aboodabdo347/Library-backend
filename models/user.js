const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
  name: String,
  avatar: String,
  role: String,
  collections: [{ type: Schema.Types.ObjectId, ref: "Collection" }],
  email: String,
  password: String,
})

const User = mongoose.model("User", userSchema)

module.exports = User
