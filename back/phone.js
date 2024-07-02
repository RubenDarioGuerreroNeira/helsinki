const express = require('express');
const path = require('path')
require('dotenv').config();
const app = express();
app.use(express.json());

const morgan = require('morgan');

const  mongoose=require('mongoose')

const connecttoMongoose=async()=>{
    const url=`mongodb+srv://rudargeneira:${process.env.MONGO_PASSWORD}@cluster0.mvojlb2.mongodb.net/Phoneapp?retryWrites=true&w=majority&appName=Cluster0`;
    mongoose.set('strictQuery',false)
    await mongoose.connect(url);
    console.log('Connected to MongoDB');


    try {
        await mongoose.connect(url);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
    }
};

connecttoMongoose();

const UserSchema= new mongoose.Schema({
    name:String,
    number:Number,
});
const User=mongoose.model('User',UserSchema)

const UserData=[
    {   name:'Rubén G.',  number:445555569},
    {   name:'Paul Sanchez', number:147589969 },
    {   name:'Alberto',    number:852147}
];


User.insertMany(UserData).then(result => {
    console.log('Users saved!', result);
}).catch(error => {
    console.error('Error saving users:', error);
});

app.delete('/api/notes/:id', (request, response) => {
    Note.findByIdAndRemove(request.params.id)
      .then(() => {
        response.status(204).end()
      })
      .catch(error => next(error))
  })
  


