const express = require('express');
const { request } = require('http');
const path = require('path')

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

app.use(express.static(path.join(__dirname, 'public')))
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

if(s || n){
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

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
})