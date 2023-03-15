const express = require('express');
const router = express.Router();
const path = require('path');
const cors = require('cors');
require('dotenv').config();
const app = express();
const bodyParser = require('body-parser');
const DBURL = process.env.MONGODB;
const mongoose = require('mongoose');


// MONGO DB Connection
let db = mongoose.connection;
db.on('error', console.error);
db.once('open',()=>{
  console.log('MongoDB Connected!')
})
mongoose.connect(DBURL, {
  dbName: 'live-chat-app',
  useUnifiedTopology: true,
  useNewUrlParser: true
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/api/register", require("./routes/api/register"));

// REACT Connect
app.use(express.static(path.join(__dirname, '../client/build')));

// Via ROOT directory
app.get("/",(req,res)=>{
  res.sendFile(path.join(__dirname, '/client/build/index.html'))
})

// API REQUESTS FROM CLIENT
// app.get("/api",(req,res)=>{
//   res.send({id:'song',userName:'songaji'});
// })
// app.get("/api/register",(req,res)=>{
//   res.send({id:'kang',userName:'kangi'});
// })


app.listen(process.env.PORT, function() {
    console.log(`listening on ${process.env.PORT}`)
})
