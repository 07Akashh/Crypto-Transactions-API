const axios = require('axios');
const Transaction = require('../models/Transaction');

const fetchTransactions = async (address) => {
    try {
        const response = await axios.get('https://api.etherscan.io/api', {
            params: {
                module: 'account',
                action: 'txlist',
                address,
                startblock: 0,
                page: 1,
                endblock: 99999999,
                sort: 'asc',
                apikey: process.env.ETHERSCAN_API_KEY,
            },
        });

        if (response.data.status !== '1') throw new Error('Failed to fetch transactions');

        const transactions = response.data.result;
        await Transaction.updateOne(
            { address },
            { $set: { transactions, createdAt: new Date() } },
            { upsert: true }
        );

        return transactions;
    } catch (error) {
        throw new Error(`Error fetching transactions: ${error.message}`);
    }
};

const calculateExpenses = (transactions) => {
    return transactions.reduce((total, tx) => {
        return total + (Number(tx.gasUsed) * Number(tx.gasPrice)) / 1e18;
    }, 0);
};

module.exports = { fetchTransactions, calculateExpenses };
