const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  surname: { type: String, required: true },
  password: { type: String, required: true, min: 8 },
  shoppingCart: { type: Types.ObjectId, ref: 'Shoe' },
  favoriteShoes: { type: Types.ObjectId, ref: 'Shoe' },
  role: [{ type: String, ref: 'Role' }],
  isActivate: { type: Boolean, default: false },
  activationLink: { type: String },
})

module.exports = model('User', schema)
