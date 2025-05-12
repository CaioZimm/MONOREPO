const favoriteRepository = require('../repositories/favoriteRepository')

exports.toggleFavorites = async (userId, cryptoName) => {
    return await favoriteRepository.toggleFavorite(userId, cryptoName);
};

exports.listFavorites = async (userId) => {
    const favorites = await favoriteRepository.indexFavorites(userId);

    return favorites;
};