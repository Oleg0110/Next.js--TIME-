import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  surname: { type: String, required: true },
  password: { type: String, required: true, min: 8 },
  shoppingCart: { type: mongoose.Types.ObjectId, ref: 'Shoe' },
  favoriteShoes: { type: mongoose.Types.ObjectId, ref: 'Shoe' },
});

export default mongoose.model('User', schema);
