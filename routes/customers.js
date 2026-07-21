var express = require('express');
var router = express.Router();

const customerController = require('../controller/customers.controller');
const authMiddleware = require('../middleware/auth');

router.get('/', authMiddleware.auth, customerController.getAllCustomer);
router.get('/:id', authMiddleware.auth, customerController.getCustomerById);
router.post('/', authMiddleware.auth, customerController.createCustomer);
router.patch('/edit/:id', authMiddleware.auth, customerController.updateCustomer);
router.delete('/delete/:id', authMiddleware.auth, customerController.destroyCustomer);

module.exports = router;