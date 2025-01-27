const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add your name'],
    },
    username: {
        type: String,
        required: [true, 'Please add your username'],
        unique: true,
        validate: {
            validator: (val) => val.startsWith('@'),
            message: 'Please begin the username with @!',
        },
    },
    email: {
        type: String,
        required: [true, 'Please add your email'],
        lowercase: true,
        unique: true,
        validate: [validator.isEmail, 'The email is invalid!'],
    },
    password: {
        type: String,
        required: [true, 'Please add your password'],
        minLength: [8, 'Password must be at least 8 characters long'],
        select: false,
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password'],
        minLength: [8, 'Password must be at least 8 characters long'],
        validate: {
            validator: function (val) {
                return val == this.password;
            },
            message: 'Passwords do not match',
        },
        select: false,
    },
    followers: {
        type: [String],
        validator: function (value) {
            return Array.isArray(value) && (new Set(value)).size === value.length;
        },
        message: 'This account already follows you',
    },
    followings: {
        type: [String],
        validator: function (value) {
            return Array.isArray(value) && (new Set(value)).size === value.length;
        },
        message: 'You already follow this account',
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);

    this.passwordConfirm = undefined;
});

const userModel = mongoose.model('user-data', userSchema);

module.exports = userModel;
