var express = require('express');
var router = express.Router();

const userController = require('../controller/user.controller')

/* GET users listing. */
router.post('/login', userController.signIn);

module.exports = router;
