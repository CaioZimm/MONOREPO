const Conversion = require('../models/Conversion');

exports.saveConversion = async (conversion) => {
    try {
        const newConversion = await Conversion.create(conversion)

        return newConversion
        
    } catch (error) {
        throw new Error(error.message);
    }
}

exports.getHistory = async (userId) => {
    try {
        const history = await Conversion.findAll({ where: { userId }, order: [['createdAt', 'DESC']]});

        return history;

    } catch (error) {
        throw new Error(error.message);
    }
}