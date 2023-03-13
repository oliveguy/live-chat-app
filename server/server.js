const express = require('express');
// const cors = require('cors');
// app.use(cors({origin:'http://localhost:3000'}));
const path = require('path');
require('dotenv').config();
const app = express();


app.use(express.static(path.join(__dirname, '../client/build')));

// Via ROOT directory
app.get("/",(req,res)=>{
  res.sendFile(path.join(__dirname, '/client/build/index.html'))
})

// API REQUESTS
app.get("/api",(req,res)=>{
  res.send({id:'song',userName:'songaji'});
})
app.post("/api/register",(req,res)=>{
  res.send({id:'kang',userName:'kangi'});
})


app.listen(process.env.PORT, function() {
    console.log(`listening on ${process.env.PORT}`)
})
// console.log(process.env.MONGODB)