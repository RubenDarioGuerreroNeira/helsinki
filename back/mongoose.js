const mongoose = require('mongoose');

if (process.argv.length < 5) {
    console.log('Please provide the password, name, and number as arguments: node mongo.js <password> <name> <number>');
    process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url = `mongodb+srv://rudargeneira:${password}@cluster0.mvojlb2.mongodb.net/Phoneapp?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set('strictQuery', false);

mongoose.connect(url)
    .then(() => {
        console.log('Connected to MongoDB');
        
        const userSchema = new mongoose.Schema({
            name: String,
            number: String
        });

        const User = mongoose.model('User', userSchema);

        const user = new User({
            name: name,
            number: number
        });

        return user.save();
    })
    .then(() => {
        console.log(`added ${name} number ${number} to phonebook`);
        return mongoose.connection.close();
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB or saving user:', error.message);
        mongoose.connection.close();
    });
