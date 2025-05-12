const express = require('express');
const favoriteController = require('../controllers/favoriteController')
const authMiddleware = require('../middlewares/authMiddleware');
const routes = express.Router()

routes.post('/favorites/toggle', authMiddleware, favoriteController.toggleFavorite);
routes.get('/favorites', authMiddleware, favoriteController.listFavorites);

module.exports = routes;