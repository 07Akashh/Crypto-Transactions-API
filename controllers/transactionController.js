const { fetchTransactions, calculateExpenses } = require('../services/transactionService');
const { getCurrentEthereumPrice } = require('../services/priceService');
const Transaction = require('../models/Transaction');
const { setCache, getCache } = require('../utils/cache');


const getTransactions = async (req, res) => {
    const address = req.params.address || req.query.address;
    const page = parseInt(req.query.page, 10) || 1;
    const pageSize = 15;
    const cacheKey = `transactions:${address}:page:${page}`;

    try {
        const cachedData = await getCache(cacheKey);

        if (cachedData) {
            return res.status(200).json(JSON.parse(cachedData));
        }

        const fetchedTransactions = await fetchTransactions(address);
        let transactionData = await Transaction.findOne({ address });

        if (!transactionData) {
            transactionData = await Transaction.create({ address, transactions: fetchedTransactions });
        } else {
            const existingTransactionIds = transactionData.transactions.map(t => t.id);
            const newTransactions = fetchedTransactions.filter(t => !existingTransactionIds.includes(t.id));

            if (newTransactions.length > 0) {
                transactionData.transactions.push(...newTransactions);
                await transactionData.save();
            }
        }

        const updatedTransactionData = await Transaction.findOne({ address })
            .select({
                transactions: { $slice: [(page - 1) * pageSize, pageSize] },
            })
            .exec();

        if (!updatedTransactionData || !updatedTransactionData.transactions) {
            return res.status(404).json({
                success: false,
                message: 'No transactions found for the specified address',
                error: {
                    code: 'NO_TRANSACTIONS_FOUND',
                    details: `No transactions available for the address: ${address}`,
                },
            });
        }

        const totalTransactions = await Transaction.aggregate([
            { $match: { address } },
            { $unwind: '$transactions' },
            { $count: 'total' },
        ]);

        const total = totalTransactions.length > 0 ? totalTransactions[0].total : 0;

        const response = {
            success: true,
            message: 'Transactions fetched and updated successfully',
            data: {
                transactions: updatedTransactionData.transactions,
                page,
                totalTransactions: total,
                totalPages: Math.ceil(total / pageSize),
            },
        };

        await setCache(cacheKey, response, 600);
        res.status(200).json(response);

    } catch (error) {
        console.error('Error fetching transactions:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch and update transactions',
            error: {
                code: 'FETCH_TRANSACTIONS_ERROR',
                details: error.message,
            },
        });
    }
};

const getExpenses = async (req, res) => {
    const address = req.params.address || req.query.address;
    const cacheKey = `expenses:${address}`;

    try {
        const cachedData = await getCache(cacheKey);

        if (cachedData) {
            return res.status(200).json(JSON.parse(cachedData));
        }

        const transactionData = await Transaction.findOne({ address });

        if (!transactionData) {
            return res.status(404).json({
                success: false,
                message: 'Address not found',
                error: {
                    code: 'ADDRESS_NOT_FOUND',
                    details: `No transactions found for the address: ${address}`,
                },
            });
        }

        const totalExpense = calculateExpenses(transactionData.transactions);
        const currentPrice = await getCurrentEthereumPrice();

        const response = {
            success: true,
            message: 'Expenses and current Ethereum price fetched successfully',
            data: {
                totalExpense,
                currentEthPrice: currentPrice,
            },
        };

        await setCache(cacheKey, response, 600);

        res.status(200).json(response);
    } catch (error) {
        console.error('Error fetching expenses:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch expenses and current Ethereum price',
            error: {
                code: 'FETCH_EXPENSES_ERROR',
                details: error.message,
            },
        });
    }
};

module.exports = { getTransactions, getExpenses };
