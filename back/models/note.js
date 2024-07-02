const mongoose = require('mongoose')


const connectToMongoose = async () => {
    const url = `mongodb+srv://rudargeneira:${process.env.MONGO_PASSWORD}@cluster0.mvojlb2.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`;
  // console.log('Conectando a MongoDB con URL:', url);  // Logging the URL
  mongoose.set('strictQuery', false)
  
  try {
    
    await mongoose.connect(url);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
  }
};

connectToMongoose();

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});
// aqui cambio el formato del json a devolver
noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

  module.exports = mongoose.model('Note', noteSchema)