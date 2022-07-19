const UserDto = require('../dtos/user-dto')
const TokenService = require('../services/TokenService')

module.exports = tokensMakeFunc = async (user, res, message) => {
  const userDto = new UserDto(user)

  const tokens = TokenService.generationToken({ ...userDto })
  await TokenService.saveToken(userDto.id, tokens.refreshToken)

  res.cookie('refreshToken', tokens.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })

  // Must use res.status(200).json()
  // in this file because when i use in UserController.js i get
  // Error: Can't set headers after they are sent to the client,
  // i use return but it doesn't help
  return res.status(200).json({ message, user: { ...userDto }, tokens })
}
