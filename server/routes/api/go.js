const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');


router.get('api/go',(req,res)=>{
  // console.log(req.body);
  res.send('sds');
})

module.exports = router;