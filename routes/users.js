var express = require('express');
var router = express.Router();

const userController = require('../controller/user.controller')
const authMiddleware = require('../middleware/auth')

/* GET users listing. */
router.post('/login', userController.signIn);
router.post('/add-user', userController.addUser);
router.patch('/:id', authMiddleware.auth, userController.updateUser);

module.exports = router;
