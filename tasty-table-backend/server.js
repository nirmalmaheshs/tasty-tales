const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Recipe = require('./app/models/Recipe');
require('dotenv').config();

const app = express();
const PORT = 8080; // Choose a port number

app.use(express.json());
app.use(cors());

const {
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_NAME,
} = process.env;
mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin` , {
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

app.post('/api/recipes', (req, res) => {
  const { title, description, ingredients, instructions } = req.body;
  const urls = ['https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2370&q=80',
'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80',
'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80']
const image = urls.sort(() => 0.5 - Math.random())[0];

  // Create a new recipe using the Recipe model
  const recipe = new Recipe({
    title,
    image,
    description,
    ingredients,
    instructions,
  });

  // Save the recipe to the database
  recipe.save()
    .then((savedRecipe) => {
      res.status(201).json(savedRecipe);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Failed to create recipe' });
    });
});

app.use('/api/recipes', require('./app/routes/recipes'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
