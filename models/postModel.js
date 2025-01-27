const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please add your username'],
        validate: {
            validator: (val) => val.startsWith('@'),
            message: 'Please begin the username with @!',
        },
    },
    name: {
        type: String,
        required: [true, 'Please add your name'],
    },
    tweet: {
        type: String,
        required: [true, 'Please write something to post'],
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

const postModel = mongoose.model('post', postSchema);

module.exports = postModel;
