const mongoose = require("mongoose");
let Booking = require('./model/booking');
//Connect database
const dbRoute = process.env.DATABASE_URL || "mongodb://admin:12345678@localhost:27017/restaurant";
mongoose.connect(dbRoute, { useNewUrlParser: true })
mongoose.set('useCreateIndex', true);
let db = mongoose.connection;
db.once("open", () => {
    console.log("connected to the database");
    
});

// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));