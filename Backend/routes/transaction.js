var express = require('express');
var router = express.Router();

var { authenticateToken } = require('../middlewares/auth.js');
var transactionController = require('../controllers/transactionController');

router.get('/', authenticateToken, transactionController.getTransactions);
router.get('/:id', authenticateToken, transactionController.getTransactionById);
router.post('/', authenticateToken, transactionController.createTransaction);


module.exports = router;