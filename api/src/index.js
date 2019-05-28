const Koa = require('koa');
const Router = require('koa-router');
const koaBody = require('koa-body');
const url = require('url');
const mongoose = require("mongoose");
const cors = require('@koa/cors');
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

//Creat app
const app = new Koa();
app.use(cors());
app.use(koaBody());

const bookingRouter = require('./routers/booking.router');
const tableRouter = require('./routers/tables.router');


//app.use(router.routes()).use(router.allowedMethods());

app.use(bookingRouter.routes());
app.use(tableRouter.routes());

const server=app.listen(8080);
module.exports=server;