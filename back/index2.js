const express = require('express');
const path = require('path')
require('dotenv').config();
const app = express();
app.use(express.json());
const morgan = require('morgan');
const  mongoose=require('mongoose')
const Note=require('./models/NotPhone')
const User=require('./models/UserPhone');
const { request } = require('http');
require('dotenv').config();

const connectToMongoose = async () => {
  const url = `mongodb+srv://rudargeneira:${process.env.MONGO_PASSWORD}@cluster0.mvojlb2.mongodb.net/Phoneapp?retryWrites=true&w=majority&appName=Cluster0`;
// console.log('Conectando a MongoDB con URL:', url);  // Logging the URL
mongoose.set('strictQuery', false)

try {
  
  await mongoose.connect(url);
  // console.log('Connected to MongoDB');
} catch (error) {
  console.error('Error connecting to MongoDB:', error.message);
}
};

connectToMongoose();


// const noteSchema= new mongoose.Schema({
//     content:String,
//     important:Boolean,
// });
// const Note= mongoose.model('Note',noteSchema)
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

const UserData=[
  {   name:'Rubén G.',  number:445555569},
  {   name:'Paul Sanchez', number:147589969 },
  {   name:'Alberto',    number:852147}
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


app.get('/api/notes',async(req,res)=>{
    try {
        const notes=await Note.find({});
        res.json(notes);
    } catch (error) {
        res.status(500).json({error:'Error al obtener las notas'})
    }
});

app.delete('/api/user/:id', (request, response) => {
  UserData.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

// Suggested code may be subject to a license. Learn more: ~LicenseLog:4032351050.
app.put('/api/user/:id',(request,response,next)=>{
   UserData.findByIdAndUpdate(request.params.id,request.body,{new:true})
   .then(updatedUser=>{
    response.json(updatedUser)
   })
   .catch(error=>next(error))
})


const port=5000


app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
       
})


