const Redis = require("ioredis");
require('dotenv').config();

const redisClient = new Redis({
  host: process.env.REDIS_HOST || 'redis',
  port: process.env.REDIS_PORT || 6379
});

redisClient.on('connect', () => console.log('Redis conectado!'));
redisClient.on('error', err => console.error('Erro Redis:', err));

module.exports = redisClient;