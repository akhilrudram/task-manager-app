// require('dotenv').config(); 
// const mongoose = require('mongoose');

// mongoose.connect(process.env.MONGO_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });

// const db = mongoose.connection;
// db.on('error', (error) => {
//     console.error('Connection error:', error);
//     process.exit(1);
// });
// db.once('open', () => {
//     console.log(`Connected to MongoDB ${db.name} at ${db.host}:${db.port}`);
// });
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URL)
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
    console.log(`Connected to MongoDB ${db.name} on ${db.host}:${db.port}`);
})

