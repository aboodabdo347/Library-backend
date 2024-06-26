const mongoose = require("mongoose")
const Schema = mongoose.Schema
const userSchema = new Schema(
  {
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, required: true },
    avatar:{type:String},
    collections: [{ type: Schema.Types.ObjectId, ref: "Collection" }],
    books:[{ type: Schema.Types.ObjectId, ref: "Book" }],
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("User", userSchema)
