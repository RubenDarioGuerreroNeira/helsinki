const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// Función de validación personalizada para números de teléfono
const phoneValidator = (value) => {
  const regex = /^(?:\d{2,3}-\d{5,})$/;
  return regex.test(value);
};

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
  },
  number: {
    type: String,
    required: true,
    // validate: {
    //   validator: phoneValidator,
    //   message: props => `${props.value} is not a valid phone number!`
    // }
  }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);




//-------------version1---------------------------
// const  mongoose=require('mongoose')

// const connecttoMongoose=async()=>{
//     const url=`mongodb+srv://rudargeneira:${process.env.MONGO_PASSWORD}@cluster0.mvojlb2.mongodb.net/Phoneapp?retryWrites=true&w=majority&appName=Cluster0`;
//     mongoose.set('strictQuery',false)
//     await mongoose.connect(url);
//     // console.log('Connected to MongoDB');


//     try {
//         await mongoose.connect(url);
//         // console.log('Connected to MongoDB');
//     } catch (error) {
//         console.error('Error connecting to MongoDB:', error.message);
//     }
// };

// connecttoMongoose();

// const UserSchema= new mongoose.Schema({
//     name:{
//         type:String,
//         minlength:3,
//         required:true,
    
// },
// number:{
//     type:Number,
//     minlength:3,
//     required:true
// }
// })

// // const Note= mongoose.model('Note',noteSchema)


// UserSchema.set('toJSON', {
//     transform: (document, returnedObject) => {
//       returnedObject.id = returnedObject._id.toString()
//       delete returnedObject._id
//       delete returnedObject.__v
//     }
//   })

// module.exports=mongoose.model('User',UserSchema)

