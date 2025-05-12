const Favorite = require('../models/Favorite');

exports.toggleFavorite = async (userId, cryptoName) => {
    const favorite = await Favorite.findOne({ where: { userId, cryptoName }})

    if(favorite){
        await favorite.destroy();
        return { favorited: false }
    }
    else{
        await Favorite.create({ userId, cryptoName });
        return { favorited: true }
    }
}

exports.indexFavorites = async (userId) => {
    try {
        const favorites = await Favorite.findAll({ where: { userId }})

        return favorites;

    } catch (error) {
        throw new Error(error.message);
    }
}