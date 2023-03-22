const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userID:{
    type: String,
    required: true,
    unique: true
  },
  userPWD:{
    type: String,
    required: true
  },
  userName:{
    type:String,
    required:true
  },
  userEmail:{
    type: String,
    required: true,
    unique: true
  },
  loginInfo:{
    type:String,
    required:true
  }
})

module.exports = User = mongoose.model("user",userSchema);
// https://iridescent-zeal.tistory.com/232