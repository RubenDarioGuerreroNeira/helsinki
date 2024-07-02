

const  mongoose=require('mongoose')

const connecttoMongoose=async()=>{
    const url=`mongodb+srv://rudargeneira:${process.env.MONGO_PASSWORD}@cluster0.mvojlb2.mongodb.net/Phoneapp?retryWrites=true&w=majority&appName=Cluster0`;
    mongoose.set('strictQuery',false)
    await mongoose.connect(url);
    // console.log('Connected to MongoDB');


    try {
        await mongoose.connect(url);
        // console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
    }
};

connecttoMongoose();

const noteSchema= new mongoose.Schema({
    content:String,
    important:Boolean,
});
// const Note= mongoose.model('Note',noteSchema)

const noteData=[{
    content:'HTML is easy',
    important:true,
},{
    content:'CSS is easy',
    important:false,
},{
    content:'JavaScript is easy',
    important:true,
}]

// Suggested code may be subject to a license. Learn more: ~LicenseLog:3989289982.
noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })


module.exports=mongoose.model('Note',noteSchema)

