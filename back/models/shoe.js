import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  productName: { type: String, required: true, unique: true },
  shoeFor: { type: String, required: true },
  shoePrice: { type: Number, required: true },
  shoeDiscountPrice: { type: Number },
  shoeSale: { type: Boolean, required: true },
  shoeNew: { type: Boolean, required: true },
  shoeSize: [{ type: Number, required: true }],
  shoeColor: { type: String, required: true },
  shoeMainPictures: [{ type: String }],
  shoeDescription: { type: String, required: true },
  shoeStyleName: { type: String, required: true },
  shoeStyleMaterial: { type: String, required: true },
  shoeStyleResponse: { type: String, responseRating: { type: Number } },
  date: { type: Date, required: true, default: Date.now },
});

export default mongoose.model('Shoe', schema);
