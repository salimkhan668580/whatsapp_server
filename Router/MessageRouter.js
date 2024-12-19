const express = require('express');

const router= express.Router();
const { sendMessage,getMessage } = require('../Controller/messageController');
const secureRoute = require('../middleware/secure');

router.post("/send/:id", secureRoute, sendMessage)
router.get("/get/:id", secureRoute, getMessage)

module.exports = router;

