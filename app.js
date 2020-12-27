const express = require('express')
const app = express()
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const route = require('./routes/user')
const cors = require("cors")

mongoose.connect('mongodb://localhost:27017/testdb', {useUnifiedTopology: true,useNewUrlParser: true})
const db = mongoose.connection 

db.on('error',(err) => {
	console.log(err)
})

db.once('open',()=>{
	console.log("database connected")
})
app.use(morgan('dev'))
app.set("view engine", "ejs"); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Authorization, Content-Type, Accept");
  next();
});

const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{
	console.log(`server is running on ${PORT}`)
})

app.use(cors());
app.use('/',route)