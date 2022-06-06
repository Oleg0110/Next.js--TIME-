require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const shoe = require('./routes/shoe')
const user = require('./routes/user')
const home = require('./routes/home')
const admin = require('./routes/admin')
const errorMiddleware = require('./middleware/errorMiddleware')
const roleMiddleware = require('./middleware/roleMiddleware')
const authMiddleware = require('./middleware/authMiddleware')
const fileUpload = require('express-fileupload')

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(cookieParser())
app.use(fileUpload())
app.use(
  cors({
    origin: 'http://localhost:3000',
  })
)

app.use('/', home)
app.use('/auth', user)
app.use('/shoe', shoe)
app.use(
  '/settings',
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
