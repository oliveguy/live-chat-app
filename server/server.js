const express = require('express');
const router = express.Router();
const path = require('path');
const cors = require('cors');
require('dotenv').config();
const app = express();
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


app.use(express.urlencoded({ extended: true })); // req.body 전송 시 필수 !!
app.use(express.json()); // req.body 전송 시 필수 !!

app.use("/api", require("./routes/api.js"));

// Via ROOT directory
app.use(express.static(path.join(__dirname, '../client/build')));
app.get("/",(req,res)=>{
  res.sendFile(path.join(__dirname, '/client/build/index.html'))
})

// app.get("/logintest",(req,res)=>{
//   User.findOne({userID:"sunghyhun", userPWD:"$2b$10$wrxs1rgZmsSslaANqzkUlOL1c5XMvllVXcqZsLoCHQYz53BGVKMVS"
// },(err, user)=>{
//     if(err) return res.status(500).json({message:"error"});
//     else if(user) return res.status(200).json({message:'user found', data:user});
//     else return res.status(404).json({message:'user not found'});
//   })
// })


app.listen(process.env.PORT, function() {
    console.log(`listening on ${process.env.PORT}`)
})
