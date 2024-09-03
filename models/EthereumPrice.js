const mongoose = require('mongoose');

const ethereumPriceSchema = new mongoose.Schema({
    price: { type: Number, required: true },
    currency: { type: String, default: 'INR' },
    fetchedAt: { type: Date, default: Date.now, index: true },
});

module.exports = mongoose.model('EthereumPrice', ethereumPriceSchema);
