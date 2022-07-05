const Product = require('../../models/Product')
const User = require('../../models/User')
const ProductDto = require('../../dtos/product-dtos')
const UserDto = require('../../dtos/user-dtos')

class AdminFunc {
  regexFunc = async (searchValue, type) => {
    const regex = new RegExp(searchValue, 'i')

    let dtoValue = []
    if (type === 'product') {
      const product = await Product.find({
        $or: [{ productNumber: { $regex: regex } }],
      }).limit(10)

      product.map((data) => dtoValue.push({ ...new ProductDto(data) }))
    } else if (type === 'customer') {
      const users = await User.find({
        $or: [{ name: { $regex: regex } }, { surname: { $regex: regex } }, { email: { $regex: regex } }],
      }).limit(10)

      users.map((data) => dtoValue.push({ ...new UserDto(data) }))
    }

    return dtoValue
  }
}

module.exports = new AdminFunc()

// module.exports = regexFunc = async (searchValue, type) => {
//   const regex = new RegExp(searchValue, 'i')

//   let dtoValue = []
//   if (type === 'product') {
//     const product = await Product.find({
//       $or: [{ productNumber: { $regex: regex } }],
//     }).limit(10)

//     product.map((data) => dtoValue.push({ ...new ProductDto(data) }))
//   } else if (type === 'customer') {
//     const users = await User.find({
//       $or: [{ name: { $regex: regex } }, { surname: { $regex: regex } }, { email: { $regex: regex } }],
//     }).limit(10)

//     users.map((data) => dtoValue.push({ ...new UserDto(data) }))
//   }

//   return dtoValue
// }

// module.exports = productRegex = async (searchValue) => {
//   console.log(2222, searchValue)
//   const regex = new RegExp(searchValue, 'i')

//   const product = await Product.find({
//     $or: [{ productNumber: { $regex: regex } }],
//   }).limit(10)

//   let dtoProducts = []
//   product.map((data) => dtoProducts.push({ ...new ProductDto(data) }))

//   return dtoProducts
// }
