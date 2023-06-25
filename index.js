const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = 3000; // Choose a port number

app.use(express.json());
app.use(cors());

const mongodbURI = process.env.MONGODB_CONNECTION_URI

mongoose.connect(mongodbURI , {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Failed to connect to MongoDB', error);
});

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.use('/api/recipes', require('./app/routes/recipes'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
