const express = require("express"); 
const User = require("../../models/User");
const router = express.Router();
const bcrypt = require("bcrypt");

router.post(
  "/",
  async (req, res) => {
    const { userID, userPWD, userName, userEmail, loginInfo } = req.body;
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

      // PWD Cripted
      const salt = await bcrypt.genSalt(10);
      user.userPWD = await bcrypt.hash(userPWD, salt);

      await user.save(); // save user in DB

      res.send("Success");
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;