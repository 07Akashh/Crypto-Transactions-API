# Crypto Transactions API

![License](https://img.shields.io/badge/license-MIT-blue.svg)  
![Node.js](https://img.shields.io/badge/node-%3E%3D14.0.0-green.svg)  
![Express](https://img.shields.io/badge/express-%5E4.17.1-yellowgreen.svg)

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Redis Caching](#redis-caching)
- [Error Handling](#error-handling)
- [Contributing](#contributing)
- [License](#license)

## Introduction

The **Crypto Transactions API** is a Node.js-based backend service designed for managing Ethereum transactions, calculating expenses, and providing current Ethereum prices. It includes caching for enhanced performance using Redis and persistent data storage with MongoDB.

## Features

- **Fetch Transactions**: Retrieve transaction data for a specific Ethereum address.
- **Calculate Expenses**: Calculate total expenses based on the fetched transactions.
- **Ethereum Price Fetching**: Retrieve the current price of Ethereum.
- **Caching**: Optimized performance using Redis to cache data and reduce API response time.
- **Pagination**: Efficient pagination for large datasets.
- **Error Handling**: Robust error handling for seamless user experience.

## Technologies Used

- **Node.js**: JavaScript runtime environment.
- **Express**: Web framework for Node.js.
- **MongoDB**: NoSQL database for storing transaction data.
- **Redis**: In-memory data structure store, used as a database, cache, and message broker.
- **Axios**: Promise-based HTTP client for API requests.
- **Socket.IO**: Enables real-time bidirectional event-based communication.
- **Mongoose**: MongoDB object modeling for Node.js.
- **WebRTC**: Real-Time Communication for peer-to-peer applications.

## Prerequisites

- **Node.js**: Version 14 or higher.
- **MongoDB**: Ensure MongoDB is installed and running.
- **Redis**: Ensure Redis is installed and running.

## Getting Started

### Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/crypto-transactions-api.git
    cd crypto-transactions-api
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Configure environment variables**:
   Create a `.env` file in the root of your project and add the required environment variables. Refer to the [Environment Variables](#environment-variables) section for details.

4. **Start the application**:
    ```bash
    npm run dev
    ```

### Environment Variables

Create a `.env` file in the root directory and add the following variables:

```plaintext
MONGODB_URI = mongodb://localhost:27017/your-db-name
ETHERSCAN_API_KEY = your-etherscan-api-key
PORT = 3000
```

Ensure the values are correctly set according to your development and production environments.

## API Endpoints

### 1. Fetch Transactions

**Endpoint**: `/api/transactions/:address`  
**URL**: `https://crypto-api.run.place/api/transactions/0xce94e5621a5f7068253c42558c147480f38b5e0d?page=1`
**Method**: `GET`  
**Description**: Fetch Ethereum transactions for a given address with pagination.

**Parameters**:
- `address` (string, required): Ethereum address to fetch transactions.
- `page` (number, optional): Page number for pagination.

**Response**:
```json
{
  "success": true,
  "message": "Transactions fetched successfully",
  "data": {
    "transactions": [...],
    "page": 1,
    "totalTransactions": 100,
    "totalPages": 10
  }
}
```

### 2. Get Expenses

**Endpoint**: `/api/expenses/:address`  
**URL**: `https://crypto-api.run.place/api/transactions/expenses/0xce94e5621a5f7068253c42558c147480f38b5e0d`
**Method**: `GET`  
**Description**: Calculate total expenses for the given Ethereum address and fetch the current Ethereum price.

**Parameters**:
- `address` (string, required): Ethereum address to calculate expenses.

**Response**:
```json
{
  "success": true,
  "message": "Expenses and current Ethereum price fetched successfully",
  "data": {
    "totalExpense": 1234.56,
    "currentEthPrice": 3200
  }
}
```

## Redis Caching

This project uses Redis to cache transaction data to improve performance and reduce the load on the database. Caching is implemented in the following way:

- **Cache Key Format**: A unique key based on the Ethereum address, e.g., `transactions:<address>`.
- **Expiry**: Cached data expires after 600 seconds (10 minutes) to ensure freshness.
- **Functions**:
  - **cacheData(key, data, expiry)**: Cache data with a specified expiry time.
  - **getCacheData(key)**: Retrieve cached data using a key.

## Error Handling

The API uses structured error handling to provide meaningful error messages and codes, ensuring a robust user experience:

- **404 Not Found**: When a specified resource does not exist.
- **500 Internal Server Error**: For unexpected server errors.
- **Error Codes**: Custom error codes are provided in responses for easier troubleshooting.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the project.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any questions, please contact:

- Your Name: [rahulk.softdev@gmail.com](mailto:rahulk.softdev@gmail.com)
- GitHub: [07Akashh](https://github.com/07Akashh)

