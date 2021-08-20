const express = require('express')
const bodyParser = require('body-parser')
const http = require('http');
const mongoose = require('mongoose')
const passport = require('passport')
const cors = require("cors");

const config = require('./config')
const userRouter = require('./routs/userRouter')
const contact = require('./routs/contactRout')

const app = express();

app.use(cors());
app.use(bodyParser.json());
//app.use(express.json())

//config mongodb
 mongoose.connect(config.mongoURL,{useNewUrlParser: true},{ useUnifiedTopology: true }).then(()=>{
  console.log('connected to db')
},(err) => {console.log(err)}
)
app.use(passport.initialize());

app.use('/users',userRouter)
app.use('/contact',contact)


const server = http.createServer(app);
server.listen(3000,'localhost')
