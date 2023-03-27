const express = require("express");
const app = express();
const User = require("../models/User");
const router = express.Router();
const bcrypt = require("bcrypt");
const mongoose = require('mongoose');

app.use(express.json());

router.post(
  "/register",
  async (req, res) => {
    const { userID, userPWD, userName, userEmail, loginInfo} = req.body;
    try {
      // userID compare
      let user = await User.findOne({ userID });
			if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }
      // assign fields on user
      user = new User({
        userID,
        userPWD,
        userName,
        userEmail,
        loginInfo
      });
      
      user.userPWD = await bcrypt.hashSync(userPWD, 10);
      await user.save(); // save user in DB

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
  const user = await User.findOne({userID:inputID});
  // encryted pwd comparision
  
  if(!user){ // No User ID
    return res.status(401).json({message:'user not found'});
  }
  let compare = bcrypt.compareSync(inputPWD, user.userPWD)
  if(compare){ // Both ID and PWD Ok ----------------
    res.status(200).json({message:'found and pwd correct', data:user});
  }
  if(user && compare == false){ // ID okay but PWD incorrect
    return res.status(401).json({message:'Your password is incorrect'});
  }
})
// bcrypt hash coparison
// https://velog.io/@yogjin/nodeJS-bcrypt-hashed-password%EC%99%80-plain-password-%EB%A5%BC-%EC%96%B4%EB%96%BB%EA%B2%8C-%EB%B9%84%EA%B5%90%ED%95%A0%EA%B9%8C


module.exports = router;