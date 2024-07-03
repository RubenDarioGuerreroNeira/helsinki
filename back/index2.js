const express = require('express');
const path = require('path');
require('dotenv').config();
const app = express();
app.use(express.json());
const morgan = require('morgan');
const mongoose = require('mongoose');
const Note = require('./models/NotPhone');
const User = require('./models/UserPhone');
const cors = require('cors');
app.use(morgan('tiny'));


app.use(cors());

const connectToMongoose = async () => {
  const url = `mongodb+srv://rudargeneira:${process.env.MONGO_PASSWORD}@cluster0.mvojlb2.mongodb.net/Phoneapp?retryWrites=true&w=majority&appName=Cluster0`;
  mongoose.set('strictQuery', false);

  try {
    await mongoose.connect(url);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
  }
};

connectToMongoose();

const NoteData = [
  { content: 'HTML is easy', important: true },
  { content: 'CSS is easy', important: false },
  { content: 'JavaScript is easy', important: true },
  { content: 'React is easy', important: false },
  { content: 'Redux is easy', important: true },
  { content: 'MongoDB is easy', important: false }
];

const UserData = [
  { name: 'Rubén G.', number: '09-1234556' },
  { name: 'Paul Sanchez', number: '040-22334455' },
  { name: 'Alberto', number: '852147' }
];

Note.insertMany(NoteData).then(result => {
  console.log('Notes saved!', result);
}).catch(error => {
  console.error('Error saving notes:', error);
});

User.insertMany(UserData).then(result => {
  console.log('Users saved!', result);
}).catch(error => {
  console.error('Error saving users:', error);
});
//----USERS-------

app.delete('/api/user/:id', (request, response, next) => {
  User.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch(error => next(error));
});


app.post('/api/users',async(req,res)=>{
  const user = req.body;
  const userObject = new User({
    name: user.name,
    number: user.number,
    
  });
    userObject.save()
    .then(result => {
      res.json(result);
    })
    .catch(error => {
      res.status(400).json({
        error: error.message
      });
    });
});

 
//app.post('/api/user', (request, response) => {
//   const user = request.body;

//   if (!user.name || !user.number) {
//     return response.status(400).json({
//       error: 'Name and number are required'
//     });
//   }

//   const userObject = new User({
//     name: user.name,
//     number: user.number
//   });

//   userObject.save()
//     .then(result => {
//       response.json(result);
//     })
//     .catch(error => {
//       response.status(400).json({
//         error: error.message
//       });
//     });
// });

app.put('/api/user/:id', (request, response, next) => {
  const { name, number } = request.body;
  User.findByIdAndUpdate(
    request.params.id,
    { name, number },
    { new: true, runValidators: true, context: 'query' }
  )
    .then(updatedUser => {
      response.json(updatedUser);
    })
    .catch(error => next(error));
});


app.get('/api/users', async (req, res) => {
try {
  const users = await User.find({});
  res.json(users);
} catch (error) {
  res.status(500).json({ error: 'Error al obtener los usuarios' });
}
});





// NOTES------------
app.get('/api/notes', async (req, res) => {
  try {
    const notes = await Note.find({});
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las notas' });
  }
});

app.post('/api/notes',async(req,res)=>{
  const note = req.body;
  const noteObject = new Note({
    content: note.content,
    important: note.important || false,
  });
  noteObject.save()
    .then(result => {
      res.json(result);
    })
    .catch(error => {
      res.status(400).json({
        error: error.message
      });
    });
});


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


const port = 5058;

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});


