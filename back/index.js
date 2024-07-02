const express = require('express');
// const { request } = require('http');
const path = require('path')
require('dotenv').config();
const app = express();
app.use(express.json());

const morgan = require('morgan');



morgan.token('body', (req) => JSON.stringify(req.body));

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));


const port = parseInt(process.env.PORT) || process.argv[3] || 8080;

let persons = [
  {
    id: 1,
    name: "Paul Sanchez",
    numbrer: 147589969
  },
  {
    id: 2,
    name: "Frank B",
    numbrer: 485858255
  },
  {
    id: 3,
    name: "David B.",
    numbrer: 858589969
  },
  {
    id: 4,
    name: "Rubén G..",
    numbrer: 445555569
  }
]

// app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app
  .set('port', port)
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs');

  app.get('/persons',(req,res)=>{
  res.json(persons);
})

// obtiene la info de la app
app.get('/persons/info',(req,res)=>{
  // res.send(`<p>${new Date()}</p>`);
  res.send(` 
  <p>Phonebook has info for ${persons.length} people</p>
  <p> ${new Date()}</p>
  ` 
  );

})


// obtiene por id de la persona 
  app.get('/persons/:id',(req,res)=>{
const id=parseInt(req.params.id);
const person = persons.find(person => person.id === id);
if (!person) {
  return res.status(404).json({ error: 'Persona no encontrada' });
}

res.json(person)

})

// elimina usuario
  app.delete('/persons/:id', (req, res) => {
  const id=parseInt(req.params.id);
  const person=persons.filter(person=>person.id===id);
  if(!person){
    return res.status(404).json({error:'Persona no encontrada'})

  }
  const deletedPerson = persons.splice(personIndex, 1);
  res.json(deletedPerson[0]);
  res.json(person)
})

// genera id

const generateId = () => {
  const maxId = persons.length > 0 ? Math.max(...persons.map(n => n.id)) : 0;
  return maxId + 1;
};


// agrega persona
app.post('/persons',(req,res)=>{
const {name,numbrer}=req.body;
const s=persons.find(person=>person.name===name);
const n=persons.find(person=>person.numbrer===numbrer);

if(!name||!numbrer) {
  return res.status(400).json({error:'Nombre y Número requerido'})
}

if(s && n){
  return res.status(400).json({error:'Nombre ya existe'})
}
// if(n){
  // return res.status(400).json({error:'Número ya existe'})


const person={
  id:generateId(),
  name,
  numbrer,

  // id:persons.length+1
}
persons.push(person);
res.json(person)
})



// ----M O N G O S E--------------------------------
const mongoose = require('mongoose')
const Note=require('./models/note')
const User=require('./models/user')

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



// const User = mongoose.model('User', userSchema);

// INSERT DATOS---INDIVIDUALES-------------
// const noteData = new Note({
//   content: 'HTML is easy',
//   important: true,
// });
// const userData = new User({
//   mame: 'Rubén G.',
//   important: true,
//  date: '02/10/2024'

// });


const NoteData=[{
  content:'HTML is easy',
  important:true,
},{
  content:'CSS is easy',
  important:false,
},{
  content:'JavaScript is easy',
  important:true,
},
{
  content:'React is easy',
  important:false,
},
{
  content:'Redux is easy',
  important:true,
},
{
  content:'MongoDB is easy',
  important:false,
}]

const UserData=[{
  name:'Rubén G.',
  important:true,
  date:'02/10/2024',
  address:'Calle 123',
  phone:'123456789' 
},{
  name:'Paul Sanchez',
  important:false,
  date:'02/10/2024',
  address:'Calle 456',
  phone:'987654321'
},{
  name:'Alberto',
  important:true,
  date:'02/10/2024',
  address:'Calle 789',
  phone:'555555555'
}]

User.insertMany(UserData).then(result => {
  console.log('Users saved!', result);
}).catch(error => {
  console.error('Error saving users:', error);
});


Note.insertMany(NoteData).then(result => {
  console.log('Notes saved!', result);
}).catch(error => {
  console.error('Error saving notes:', error);
});

// AQUI AGREGO NOTAS INDIVIDUALE 
// const note=new Note(NoteData)
// const user=new User(UserData)

// note.save().then(result => {
//   console.log('note saved!');
//   //mongoose.connection.close();
// }).catch(error => {
//   console.error('Error saving note:', error.message);
// });

// user.save().then(result => {
//   console.log('User saved!');
//   mongoose.connection.close();
// }).catch(error => {
//   console.error('Error saving note:', error.message);
// });


// Note.find({important:true}).then(notes => {
//   console.log('Notes:', notes);
// }).catch(error => {
//   console.error('Error finding notes:', error.message);
// });




app.get('/api/notes', async (req, res) => {
  try {
    const notes = await Note.find({});
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las notas' });
  }
});

// Obtener todos los usuarios
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
});


// crea una nueva nota 
app.post('/api/notes', (request, response) => {
  const body = request.body

  if (body.content === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })

  note.save().then(savedNote => {
    response.json(savedNote)
  })
})

// note por id
app.get('/api/notes/:id', (request, response) => {
  Note.findById(request.params.id).then(note => {
    if(Note){
      response.json(note)
    }else{
      response.status(404).end()
    }
  })
  .catch(error => next(error))
  })

  app.put('/api/notes/:id', (request, response, next) => {
    const body = request.body
  
    const note = {
      content: body.content,
      important: body.important,
    }
  
    Note.findByIdAndUpdate(request.params.id, note, { new: true })
      .then(updatedNote => {
        response.json(updatedNote)
      })
      .catch(error => next(error))
  })


// elimina nota
app.delete('/api/notes/:id', (request, response) => {
  Note.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})






// console.log('MONGO_URL:', process.env.MONGO_URL);
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
     
})