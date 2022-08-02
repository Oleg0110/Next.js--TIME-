const jwt = require('jsonwebtoken')
const Token = require('../models/Token')

class TokenService {
  generationToken(payload) {
    const accessToken = jwt.sign(payload, process.env.SECRET_JWT_ACCESS_PHRASE, { expiresIn: '15m' })
    const refreshToken = jwt.sign(payload, process.env.SECRET_JWT_REFRESH_PHRASE, { expiresIn: '30d' })
    return {
      accessToken,
      refreshToken,
    }
  }

  async saveToken(userId, refreshToken) {
    const tokenData = await Token.findOne({ userId })

    if (tokenData) {
      tokenData.refreshToken = refreshToken
      return await tokenData.save()
    }

    const token = new Token({
      userId,
      refreshToken,
    })

    await token.save()

    return token
  }

  async removeRefreshToken(refreshToken) {
    const token = await Token.findOneAndDelete({ refreshToken })
    return token
  }

  async findToken(refreshToken) {
    const token = await Token.findOne({ refreshToken })
    return token
  }

  async validateAccessToken(token) {
    try {
      // console.log(jwt.verify(token, process.env.SECRET_JWT_ACCESS_PHRASE))
      console.log(1, token)
      const userData = jwt.verify(token, process.env.SECRET_JWT_ACCESS_PHRASE, (err, decoded) => {
        console.log(err)
        next()
      })

      // return userData
    } catch (e) {
      return null
    }
  }
  async validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.SECRET_JWT_REFRESH_PHRASE)

      return userData
    } catch (e) {
      return null
    }
  }
}

module.exports = new TokenService()
