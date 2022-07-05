const { Schema, model } = require('mongoose')

const schema = new Schema({
  productNumber: { type: String, required: true },
  productName: { type: String, unique: true },
  productFor: { type: String },
  productPrice: { type: Number },
  productDiscountPrice: { type: Number },
  productSale: { type: Boolean },
  productNew: { type: Boolean },
  productSize: [{ type: Number }],
  productColor: { type: String },
  productMainPictures: { type: String },
  productDescription: { type: String },
  productStyleName: { type: String },
  productStyleMaterial: { type: String },
  productStyleResponse: { type: String, responseRating: { type: Number } },
  date: { type: Date, default: Date.now },
})

module.exports = model('Product', schema)
