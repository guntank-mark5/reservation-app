const mongoose = require("mongoose")

const Schema = mongoose.Schema

const ProductSchema = new Schema({
  coverImage: String,
  name: {
    type: String, required: true, max: [60, '最大60文字まで']
  },
  price: Number,
  description: String,
  heading1: String,
  heading2: String,
  heading3: String,
})

module.exports = mongoose.model('product', ProductSchema)
