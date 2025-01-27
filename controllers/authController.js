const { catchAsync, AppError } = require('../utils/AppErrors.js');
const jwt = require('jsonwebtoken');
const path = require('path');
const bcrypt = require('bcrypt');
const userModel = require('../models/userModel.js');
require('dotenv').config({ path: path.join(__dirname, 'config.env') });

const issueToken = (id) =>
    jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES,
    });

exports.signup = catchAsync(async (req, res) => {
    const newUser = await userModel.create(req.body);

    const token = issueToken(newUser._id);

    res.cookie('jwt', token, {
        httpOnly: true,
        secure: true,
        maxAge: 100 * 60 * 60,
    });

    res.redirect('/');
});

exports.login = catchAsync(async (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password)
        return next(new AppError('Username or password missing', 400));

    const freshUser = await userModel
        .findOne({ username: username })
        .select('password');

    if (!freshUser || !(await bcrypt.compare(password, freshUser.password)))
        return next(new AppError('Username or password is invalid', 401));

    const token = issueToken(freshUser._id);

    res.cookie('jwt', token, {
        httpOnly: true,
        secure: true,
        maxAge: 100 * 60 * 60,
    });

    res.redirect('/');
});

exports.logout = catchAsync(async (req, res, next) => {
    res.clearCookie('jwt', { httpOnly: true, secure: true });
    res.redirect('/logout');
    // res.render('logout');
});

exports.protect = catchAsync(async (req, res, next) => {
    const token = req.cookies.jwt;

    if (!token) {
        res.redirect('/logout');
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const currentUser = await userModel.findById(decoded.id);
    if (!currentUser) {
        res.redirect('/logout');
    }

    req.username = currentUser.username;
    next();
});
