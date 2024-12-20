const express = require('express');
const secureRoute = require('../middleware/secure');

const router= express.Router();
const { signup, login,logout,allUsers }=require('../Controller/userController.js');


router.post("/signup", signup)

router.post("/login", login)
router.post("/logout",logout)
router.get("/allusers",allUsers);
// router.get("/allusers", secureRoute, allUsers);

module.exports = router;