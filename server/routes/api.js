const express = require("express");
const app = express();
const User = require("../models/User");
const router = express.Router();
const bcrypt = require("bcrypt");
const mongoose = require('mongoose');
app.use(express.urlencoded({ extended: true }));
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
      
      // PWD Encripted
      // const salt = await bcrypt.genSalt(10);
      // user.userPWD = await bcrypt.hash(userPWD, salt);

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
  if(compare){ // ID and PWD Ok
    return res.status(200).json({message:'found and pwd correct', data:user});
  }
  if(user && compare == false){ // ID okay but PWD incorrect
    return res.status(401).json({message:'Your password is incorrect'});
  }

})
// let user = User.findOne({ userID:inputID });
// User.findOne({userID:inputID, userPWD:hash},(err, user)=>{
//   if(err) return res.status(500).json({message:"error"});
//   else if(user) return res.status(200).json({message:'user found', data:user});
//   else return res.status(404).json({message:'user not found'});
// })


module.exports = router;