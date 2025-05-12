const authController = require('../controllers/authController')
const express = require('express')
const routes = express.Router()

routes.post('/register', authController.registerUser);
routes.post('/login', authController.loginUser);

module.exports = routes;