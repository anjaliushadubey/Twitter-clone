const { catchAsync } = require('../utils/AppErrors.js');
const userModel = require('./../models/userModel.js');

exports.follow = catchAsync(async (req, res, next) => {
    const newFollowings = [
        ...(
            await userModel
                .findOne({ username: req.params.username })
                .select('followings')
        ).followings,
        req.body.username,
    ];

    let followed = await userModel.findByIdAndUpdate(
        await userModel
            .findOne({ username: req.params.username })
            .select('_id'),
        { followings: newFollowings },
        { new: true }
    );

    const newFollowers = [
        ...(
            await userModel
                .findOne({ username: req.body.username })
                .select('followers')
        ).followers,
        req.params.username,
    ];

    followed = await userModel.findByIdAndUpdate(
        await userModel.findOne({ username: req.body.username }).select('_id'),
        { followers: newFollowers },
        { new: true }
    );

    // res.status(200).json({
    //     status: 'success',
    //     data: {
    //         followed,
    //     },
    // });

    res.status(200).redirect('/');
});

exports.unfollow = catchAsync(async (req, res, next) => {
    const newFollowings = (
        await userModel
            .findOne({ username: req.params.username })
            .select('followings')
    ).followings.filter((val) => val !== req.body.username);

    let unfollowed = await userModel.findByIdAndUpdate(
        await userModel
            .findOne({ username: req.params.username })
            .select('_id'),
        { followings: newFollowings },
        { new: true }
    );

    const newFollowers = (
        await userModel
            .findOne({ username: req.body.username })
            .select('followings')
    ).followings.filter((val) => val !== req.params.username);

    unfollowed = await userModel.findByIdAndUpdate(
        await userModel.findOne({ username: req.body.username }).select('_id'),
        { followers: newFollowers },
        { new: true }
    );

    // res.status(200).json({
    //     status: 'success',
    //     data: {
    //         unfollowed,
    //     },
    // });
    
    res.status(200).redirect('/');
});
