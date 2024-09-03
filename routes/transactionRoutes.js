const express = require('express');
const { getTransactions, getExpenses } = require('../controllers/transactionController');
const validateAddress = require('../utils/validateAddress');

const router = express.Router();

router.get('/expenses/:address', validateAddress, getExpenses);
router.get('/:address', validateAddress, getTransactions);

module.exports = router;
