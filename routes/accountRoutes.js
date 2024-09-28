const express = require("express");
const router = express.Router();
const BnkAccountcontroller = require("./BnkAccountcontroller");


router.post("/",authenticateUser,authorizeUser('Accounts'),BnkAccountcontroller.createaccount);
 router.get("/:title",BnkAccountcontroller.getaccount);

 
module.exports = router;