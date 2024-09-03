const axios = require('axios');
const EthereumPrice = require('../models/EthereumPrice');

const fetchAndStoreEthereumPrice = async () => {
    try {
        const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
            params: { ids: 'ethereum', vs_currencies: 'inr' },
        });

        const price = response.data.ethereum.inr;
        await EthereumPrice.create({ price, fetchedAt: new Date() });

        return price;
    } catch (error) {
        throw new Error(`Error fetching Ethereum price: ${error.message}`);
    }
};

const getCurrentEthereumPrice = async () => {
    const latestPrice = await EthereumPrice.findOne().sort({ fetchedAt: -1 });
    return latestPrice ? latestPrice.price : null;
};

module.exports = { fetchAndStoreEthereumPrice, getCurrentEthereumPrice };
