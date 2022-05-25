import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import shoe from './routes/shoe.js';
import user from './routes/user.js';
import home from './routes/home.js';

const app = express();
const PORT = 5000;
const MONGODB_URL =
  'mongodb+srv://Oleg:1234567890@cluster0.sm7pk.mongodb.net/TIME?retryWrites=true&w=majority';

app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);

app.use('/', home);
app.use('/user', user);
app.use('/shoe', shoe);

app.get('/', (req, res) => {
  res.status(200).json('DA');
});

const asyncStart = async () => {
  try {
    await mongoose.connect(MONGODB_URL, {
      useNewUrlParser: true,
    });
    app.listen(PORT, () => {
      console.log(`Start on port ${PORT}.....`);
    });
  } catch (error) {
    console.log(error);
  }
};

asyncStart();
