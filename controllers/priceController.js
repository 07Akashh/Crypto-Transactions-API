const { fetchAndStoreEthereumPrice } = require('../services/priceService');

const fetchEthereumPrice = async () => {
    try {
        await fetchAndStoreEthereumPrice();
        console.log('Ethereum price fetched and stored successfully.');
    } catch (error) {
        console.error(`Failed to fetch Ethereum price: ${error.message}`);
    }
};

module.exports = { fetchEthereumPrice };
