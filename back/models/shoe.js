const { Schema, model } = require('mongoose')

const schema = new Schema({
  productName: { type: String, unique: true },
  shoeFor: { type: String },
  shoePrice: { type: Number },
  shoeDiscountPrice: { type: Number },
  shoeSale: { type: Boolean },
  shoeNew: { type: Boolean },
  shoeSize: [{ type: Number }],
  shoeColor: { type: String },
  shoeMainPictures: [{ type: String }],
  shoeDescription: { type: String },
  shoeStyleName: { type: String },
  shoeStyleMaterial: { type: String },
  shoeStyleResponse: { type: String, responseRating: { type: Number } },
  date: { type: Date, default: Date.now },
})

module.exports = model('Shoe', schema)
