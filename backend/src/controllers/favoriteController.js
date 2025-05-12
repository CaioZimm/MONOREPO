const favoriteService = require('../services/favoriteService')

exports.toggleFavorite = async (req, res) => {
    const { cryptoName } = req.body
    const userId = req.user.id;

    if (!cryptoName) {
        return res.status(400).json({ error: 'Informe uma moeda para favoritar' });
    }

    try {
        const favorite = await favoriteService.toggleFavorites(userId, cryptoName);
        res.status(favorite.favorited ? 201 : 200 ).json(
            {   message: favorite.favorited ? 'Adicionado aos favoritos' : 'Removido dos favoritos', 
                data: favorite 
            });

    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}

exports.listFavorites = async (req, res) => {
    try {
        const favorites = await favoriteService.listFavorites(req.user.id);
        
        return res.status(200).json({ message: 'Lista de favoritos: ', data: favorites })

    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}