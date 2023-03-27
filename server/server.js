const express = require('express');
const app = express();

const router = express.Router();
const path = require('path');
const cors = require('cors');

require('dotenv').config();
const DBURL = process.env.MONGODB;
const mongoose = require('mongoose');
const session = require('express-session');
const cookieParser = require('cookie-parser');

// chat const set
const http = require('http').createServer(app);
const io = require("socket.io")(http,{
  cors: {
    origin:'http://localhost:3000',
    credential:true
  }
});
// const io = new Server(http);

app.use(cookieParser(process.env.SECRET));
app.use(session({
  secret: process.env.SECRET, // 암호화하는 데 쓰일 키
  resave: false, // 세션을 언제나 저장할지 설정함
  saveUninitialized: true, // 세션에 저장할 내역이 없더라도 처음부터 세션을 생성할지 설정
  cookie: {	//세션 쿠키 설정 (세션 관리 시 클라이언트에 보내는 쿠키)
    httpOnly: true, // 자바스크립트를 통해 세션 쿠키를 사용할 수 없도록 함
    Secure: true
  }
}));
// MONGO DB Connection
let db = mongoose.connection;
db.on('error', console.error);
db.once('open',()=>{
  console.log('MongoDB Connected!')
})
mongoose.connect(DBURL, {
  dbName: 'live-chat-app',
  useUnifiedTopology: true,
  useNewUrlParser: false
})
// SESSION SETTING

app.use(express.urlencoded({ extended: true })); // req.body 전송 시 필수 !!
app.use(express.json()); // req.body 전송 시 필수 !!

app.use("/api", require("./routes/api.js"));

// Via ROOT directory
app.use(express.static(path.join(__dirname, '../client/build')));
app.get("/",(req,res)=>{
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
})

/////CHAT
io.on('connection',(socket)=>{
  console.log('A user connected')

  socket.on('userMSG',(data)=>{
    console.log(`server recieved: ${data}`)
    io.emit('broadcast',data)
  })
})


http.listen(process.env.PORT, function() {
    console.log(`listening on ${process.env.PORT}`)
})


// concurrently