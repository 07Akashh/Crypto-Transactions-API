const Redis = require("ioredis");

let client

(async () => {
    client = new Redis({
    });
    client.on('error', (err) => {
        console.error('Redis error:', err);
    });
    
    client.on('connect', () => {
        console.log('Connected to Redis');
    });
})();


async function getCache(key) {
    try {
        const cacheData = await client.get(key);
        return cacheData;
    } catch (err) {
        return null;
    }
}

function setCache(key, data, ttl = REDIS_TTL) {
    try {
        client.set(key, JSON.stringify(data), "EX", ttl);
    } catch (err) {
        return null;
    }
}

function removeCache(key) {
    try {
        client.del(key);
    } catch (err) {
        return null;
    }
}

module.exports = { getCache, setCache, removeCache };