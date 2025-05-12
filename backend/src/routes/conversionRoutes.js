const conversionController = require('../controllers/conversionController')
const authMiddleware = require('../middlewares/authMiddleware');
const express = require('express');
const routes = express.Router()

routes.post('/conversion', authMiddleware, conversionController.registerConversion);
routes.get('/history', authMiddleware, conversionController.historyConversion);

module.exports = routes;