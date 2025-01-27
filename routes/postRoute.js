const express = require('express');
const { post, deletePost } = require('../controllers/postController.js');

const route = express.Router();

route.use(express.json());
route.use(express.urlencoded({ extended: true }));

route.route('/').post(post);

route.route('/delete/:id').delete(deletePost);

module.exports = route;
