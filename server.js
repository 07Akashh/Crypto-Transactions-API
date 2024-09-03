const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cron = require('node-cron');
const transactionRoutes = require('./routes/transactionRoutes');
const errorHandler = require('./middlewares/errorHandler');
const { fetchEthereumPrice } = require('./controllers/priceController');
const helmet = require('helmet')

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

app.use('/api/transactions', transactionRoutes);

app.use(helmet())

app.use(errorHandler);


cron.schedule('*/10 * * * *', fetchEthereumPrice);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
