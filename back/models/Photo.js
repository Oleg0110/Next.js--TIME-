const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
  productId: { type: Types.ObjectId, required: true, ref: 'Product' },
  photoName: { type: String, required: true },
})

module.exports = model('Photo', schema)
