const express = require('express');
const { follow, unfollow } = require('./../controllers/userController.js');

const route = express.Router();

route.use(express.json());
route.use(express.urlencoded({ extended: true }));

route.route('/follow/:username').post(follow);

route.route('/unfollow/:username').post(unfollow);

module.exports = route;
