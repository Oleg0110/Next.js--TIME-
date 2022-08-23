const Product = require('../../models/Product')
const User = require('../../models/User')
const ProductDto = require('../../dtos/product-dto')
const UserDto = require('../../dtos/user-dto')
const Order = require('../../models/Order')
const OrderDto = require('../../dtos/order-dto')
const Photo = require('../../models/Photo')
const fs = require('fs')

class AdminFunc {
  regexFunc = async (searchValue, type) => {
    const regex = new RegExp(searchValue, 'i')

    let dtoValue = []
    if (type === 'product') {
      const product = await Product.find({
        $or: [{ productNumber: { $regex: regex } }],
      }).limit(10)

      product.map((data) => dtoValue.push({ ...new ProductDto(data) }))
    } else if (type === 'user') {
      const users = await User.find({
        $or: [{ name: { $regex: regex } }, { surname: { $regex: regex } }, { email: { $regex: regex } }],
      }).limit(10)

      users.map((data) => dtoValue.push({ ...new UserDto(data) }))
    } else if (type === 'order') {
      const orders = await Order.find({ orderStatus: true, $or: [{ orderNumber: { $regex: regex } }] }).limit(10)

      orders.map((data) => dtoValue.push({ ...new OrderDto(data) }))
    }

    return dtoValue
  }

  deletePhotos = async (productId) => {
    const findFiles = await Photo.find({ productId })

    try {
      for (let i = 0; i < findFiles.length; i++) {
        if (fs.existsSync(`static/${findFiles[i].photoName}`)) {
          fs.unlink(`static/${findFiles[i].photoName}`, (err) => {
            if (err) return console.log(err)

            console.log('File deleted!')
          })
        }
      }
    } catch (e) {
      console.log(e)
    }

    await Photo.deleteMany({ productId })
  }
}

module.exports = new AdminFunc()
