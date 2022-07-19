require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const product = require('./routes/product')
const user = require('./routes/user')
const home = require('./routes/home')
const admin = require('./routes/admin')
const errorMiddleware = require('./middleware/errorMiddleware')
const roleMiddleware = require('./middleware/roleMiddleware')
const authMiddleware = require('./middleware/authMiddleware')
const fileUpload = require('express-fileupload')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(cookieParser({ credentials: true, origin: process.env.CLIENT_URL }))
app.use(fileUpload())
app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
)

app.use('/', home)
app.use('/', user)
app.use('/product', product)
app.use(
  '/administration-page',
  // roleMiddleware(['admin']), authMiddleware,
  admin
)
app.use(errorMiddleware)

const asyncStart = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
    })
    app.listen(PORT, () => {
      console.log(`Start on port ${PORT}.....`)
    })
  } catch (error) {
    console.log(error)
  }
}

asyncStart()
