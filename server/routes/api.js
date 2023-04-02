const express = require("express");
const app = express();
const User = require("../models/User");
const router = express.Router();
const bcrypt = require("bcrypt");
const mongoose = require('mongoose');
const session = require('express-session');

app.use(express.json());

router.post(
  "/register",
  async (req, res) => {
    const { userID, userPWD, userName, userEmail, loginInfo} = req.body;
    try {
      let user = await User.findOne({ userID });
			if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }
      user = new User({
        userID,
        userPWD,
        userName,
        userEmail,
        loginInfo
      });
      
      user.userPWD = await bcrypt.hashSync(userPWD, 10);
      await user.save();

      res.send("Success");
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

router.post("/login", async(req,res)=>{
  let inputID = req.body.inputID;
  let inputPWD = req.body.inputPWD;
  let updateLogin = req.body.dateTime;
  const user = await User.findOne({userID:inputID});
  
  if(!user){
    return res.status(401).json({message:'user not found',data:'noID'});
  }
  let compare = bcrypt.compareSync(inputPWD, user.userPWD)
  if(compare){
    res.status(200).json({message:'found and pwd correct', data:user});
    user.loginInfo = updateLogin;
    await user.save();
  }
  if(user && compare == false){
    return res.status(401).json({message:'Your password is incorrect',data:'nopassword'});
  }
})
// bcrypt hash coparison
// https://velog.io/@yogjin/nodeJS-bcrypt-hashed-password%EC%99%80-plain-password-%EB%A5%BC-%EC%96%B4%EB%96%BB%EA%B2%8C-%EB%B9%84%EA%B5%90%ED%95%A0%EA%B9%8C


router.get("/userlist", async(req,res)=>{
  if(process.env.SECRET == req.secret){
    let DB_data = await User.find()
    res.send(DB_data);;
  }
})

module.exports = router;