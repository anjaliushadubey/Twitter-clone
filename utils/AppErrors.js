class AppError extends Error {
    constructor(message, statusCode) {
        super(message);

        this.statusCode = statusCode;
    }
}
exports.AppError = AppError;

exports.globalErrorHandler = (err, req, res, next) => {
    // res.status(err.statusCode || 500).json({
    //     status: err.status || 'Error',
    //     statusCode: err.statusCode || 500,
    //     message: err.message || 'Something went very wrong',
    // });

    const data = {
        status: err.status || 'Error',
        statusCode: err.statusCode || 500,
        message: err.message || 'Something went very wrong',
    };
    res.render('error',data)
};

exports.catchAsync = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    };
};
