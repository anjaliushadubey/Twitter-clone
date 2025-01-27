const { catchAsync, AppError } = require('../utils/AppErrors.js');
const userModel = require('./../models/userModel.js');
const postModel = require('./../models/postModel.js');

const getData = async (req, res) => {
    const freshUser = await userModel.findOne({ username: req.username });

    const users = await userModel.find().select('name username');

    const posts = await postModel.find().sort({ date: -1 });

    return (data = {
        username: freshUser.username,
        name: freshUser.name,
        users: users.filter(
            (val) =>
                val.username !== freshUser.username &&
                !freshUser.followings.includes(val.username)
        ),
        followers: users.filter((val) => {
            return freshUser.followers.includes(val.username);
        }),
        followings: users.filter((val) => {
            return freshUser.followings.includes(val.username);
        }),
        posts: posts.filter((val) => {
            return (
                val.username === freshUser.username ||
                freshUser.followings.includes(val.username)
            );
        }),
    });
};

exports.home = catchAsync(async (req, res, next) => {
    const data = await getData(req, res);

    data.title = 'Home';

    res.render('home', data);
});

exports.login = catchAsync(async (req, res, next) => {
    res.render('login');
});

exports.signup = catchAsync(async (req, res, next) => {
    res.render('signup');
});

exports.logout = catchAsync(async (req, res, next) => {
    res.render('logout');
});

exports.profile = catchAsync(async (req, res, next) => {
    const data = await getData(req, res);

    data.title = 'Profile';

    res.render('profile', data);
});

exports.connect = catchAsync(async (req, res, next) => {
    if (!req.useragent.isMobile)
        return next(new AppError('Page not found', 404));

    const data = await getData(req, res);

    data.title = 'Connect';

    res.render('connect', data);
});
