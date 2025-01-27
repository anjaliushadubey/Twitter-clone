const express = require('express');
const { signup, login, logout, protect } = require('../controllers/authController.js');

const route = express.Router();

route.use(express.json());
route.use(express.urlencoded({ extended: true }));

route.route('/signup').post(signup);

route.route('/login').post(login);

route.route('/logout').get(logout)

module.exports = route;
