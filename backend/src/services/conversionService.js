const conversionRepository = require('../repositories/conversionRepository')
const { getConversion } = require('../utils/axios')

exports.registerConversion = async (userId, cryptoName, amount) => {
    if (!cryptoName || !amount) {
        throw new Error('Informe uma moeda ou uma quantidade para conversão')
    }

    const { brl, usd } = await getConversion(cryptoName.toLowerCase())

    const conversion = {
        userId, 
        cryptoName, 
        amount, 
        brl: brl * amount, 
        usd: usd * amount
    }
    
    return await conversionRepository.saveConversion(conversion);
}

exports.historyConversion = async (userId) => {
    const history = await conversionRepository.getHistory(userId);

    if (!history || history.length === 0) {
        return new Error('Sem histórico até o momento');
    }

    return history;
}