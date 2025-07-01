const express = require('express');
const router = express.Router();

const { authenticateToken } = require('../middlewares/auth');
const transactionController = require('../controllers/transactionController');

router.get('/', authenticateToken, transactionController.getTransactions);
router.get('/:id', authenticateToken, transactionController.getTransactionById);
router.post('/', authenticateToken, transactionController.createTransaction);

module.exports = router;