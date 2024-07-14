const express = require('express');
const path = require('path');
require('dotenv').config();
const app = express();
app.use(express.json());
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/BlogModel');


const cors = require('cors');
app.use(morgan('tiny'));

const BlogRoutes = require('./Controllers/BlogRouter');


app.use(cors());

const connectToMongoose = async () => {
  const url = `mongodb+srv://rudargeneira:${process.env.MONGO_PASSWORD}@cluster0.mvojlb2.mongodb.net/BlogApp?retryWrites=true&w=majority&appName=Cluster0`;
  mongoose.set('strictQuery', false);

  try {
    await mongoose.connect(url);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
  }
};

connectToMongoose();



const BlogData = [
  { title: '100 años de soledad', author: "Gabo Márquez",url:"www.gabo.com",likes:500000 },
  {title:"El Coronel no Tiene quien le escriba",author:"Gabo Márquez",url:"www.gabo.com",likes:100000}
];


Blog.insertMany(BlogData).then(result => {
  console.log('Blog saved!', result);
}).catch(error => {
  console.error('Error saving Blog:', error);
});


app.use('/blog', BlogRoutes);



// Middleware para manejo de errores
app.use((error, request, response, next) => {
  console.error(error.message);
  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'Malformatted ID' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }
  next(error);
});


const port = 5059;

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});


