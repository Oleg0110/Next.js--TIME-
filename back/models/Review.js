const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
  productId: { type: Types.ObjectId, required: true, ref: 'Product' },
  userId: { type: Types.ObjectId, required: true, ref: 'User' },
  userName: { type: String, required: true },
  comment: { type: String, required: true },
  rating: { type: Number, required: true },
  date: { type: Date, default: Date.now },
})

module.exports = model('Review', schema)
