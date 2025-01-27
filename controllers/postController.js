const postModel = require('./../models/postModel.js');
const { catchAsync } = require('./../utils/AppErrors.js');

exports.post = catchAsync(async (req, res, next) => {
    const post = await postModel.create(req.body);

    // res.status(200).json({
    //     status: 'success',
    //     data: {
    //         post,
    //     },
    // });

    res.status(200).redirect('/');
});

exports.deletePost = catchAsync(async (req, res, next) => {
    const post = await postModel.deleteOne({ _id: req.params.id });

    res.status(200).json({
        status: 'success',
        data: {
            post,
        },
    });
});
