const ApiErrors = require('../utils/apiErrors')

const errorMiddleware = (err, req, res, next) => {
  console.log(err)
  try {
    if (err instanceof ApiErrors) {
      return res.status(err.status).json({ message: err.message, errors: err.errors })
    }

    return res.status(500).json({ message: 'No anticipated error' })
  } catch (e) {
    res.status(401).json({ message: 'No authorization' })
  }
}

module.exports = errorMiddleware
