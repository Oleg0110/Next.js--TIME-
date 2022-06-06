const Shoe = require('../models/Shoe')
const User = require('../models/User')

class AdminService {
  async getProducts(text) {
    const regex = new RegExp(text, 'i')

    const shoes = await Shoe.find({
      $or: [
        { productName: { $regex: regex } },
        { shoeStyleMaterial: { $regex: regex } },
        { shoeStyleName: { $regex: regex } },
        { shoeColor: { $regex: regex } },
      ],
    }).limit(10)

    return shoes
  }

  async addProduct(
    productName,
    shoeFor,
    shoeNew,
    shoePrice,
    shoeDiscountPrice,
    shoeSale,
    shoeSize,
    shoeColor,
    shoeDescription,
    shoeStyleName,
    shoeStyleMaterial,
    picture
  ) {
    const user = new Shoe({
      productName,
      shoeFor,
      shoeNew,
      shoePrice,
      shoeDiscountPrice,
      shoeSale,
      shoeSize,
      shoeColor,
      shoeDescription,
      shoeStyleName,
      shoeStyleMaterial,
    })

    return await user.save()
  }

  async changeProduct(productId, shoePrice, shoeDiscountPrice, shoeSale, shoeNew, shoeSize) {
    const changedProduct = await Shoe.findOneAndUpdate(
      { _id: productId },
      { $set: { shoePrice, shoeDiscountPrice, shoeSale, shoeNew, shoeSize } },
      { new: true }
    )

    return changedProduct
  }

  async deleteProduct(productId) {
    const deletedProduct = await Shoe.findOneAndDelete({ _id: productId })

    return deletedProduct
  }

  async getUsers(text) {
    const regex = new RegExp(text, 'i')

    const users = await User.find({
      $or: [{ name: { $regex: regex } }, { surname: { $regex: regex } }, { email: { $regex: regex } }],
    }).limit(10)

    return users
  }
}

module.exports = new AdminService()
