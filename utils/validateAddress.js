const { isAddress } = require('web3-utils');

const validateAddress = (req, res, next) => {
    const address = req.params.address;

    if (!isAddress(address)) {
        return res.status(400).json({
            success: false,
            message: 'Validation Error',
            error: {
                code: 'INVALID_ETH_ADDRESS',
                details: `The provided address '${address}' is not a valid Ethereum address.`,
            },
        });
    }

    next();
};

module.exports = validateAddress;
