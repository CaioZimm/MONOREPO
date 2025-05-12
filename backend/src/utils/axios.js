const axios = require('axios');
const redisClient = require('../../config/redis')

exports.getConversion = async (cryptoName) => {
    const cacheKey = `conversion:${cryptoName}`
    const cached = await redisClient.get(cacheKey)

    if(cached){
        return JSON.parse(cached)
    }

    const response = await axios.get(
        `https://api.coingecko.com/api/v3/simple/price?ids=${cryptoName}&vs_currencies=brl,usd`
    );

    if (!response.data[cryptoName]) {
        throw new Error('Criptomoeda inválida ou não encontrada');
    }

    const prices = {
        brl: response.data[cryptoName].brl,
        usd: response.data[cryptoName].usd
    }

    await redisClient.set(cacheKey, JSON.stringify(prices), 'EX', 60);
    
    return prices;
}