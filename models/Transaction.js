const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    address: { type: String, required: true, index: true },
    transactions: { type: Array, required: true },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Transaction', transactionSchema);
