const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
  orderNumber: { type: String, required: true },
  userId: { type: Types.ObjectId, ref: 'User' },
  userName: { type: String, required: true },
  userSurname: { type: String, required: true },
  userRegion: { type: String, required: true },
  userAddress: { type: String, required: true },
  userPhone: { type: String, required: true },
  userCity: { type: String, required: true },
  userEmail: { type: String, required: true },
  totalPrice: { type: Number, required: true },
  orderProducts: [{ type: Object, required: true }],
  orderStatus: { type: Boolean, required: true, default: false },
})

module.exports = model('Order', schema)
