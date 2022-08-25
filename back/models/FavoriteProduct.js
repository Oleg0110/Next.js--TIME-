const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
  userId: { type: Types.ObjectId, ref: 'User' },
  product: { type: Object, required: true },
})

module.exports = model('FavoriteProduct', schema)
