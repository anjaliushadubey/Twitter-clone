const express = require('express');
const cookieParser = require('cookie-parser');
const useragent = require('express-useragent');
const path = require('path');
const authRoute = require('./routes/authRoute.js');
const postRoute = require('./routes/postRoute.js');
const userRoute = require('./routes/userRoute.js');
const viewRoute = require('./routes/viewRoute.js');
const { AppError, globalErrorHandler } = require('./utils/AppErrors.js');
const { protect } = require('./controllers/authController.js');
const { home } = require('./controllers/viewController.js');
const compression = require('compression');
require('dotenv').config({ path: path.join(__dirname, 'config.env') });
require('./database.js');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(compression());
app.use(cookieParser());
app.use(useragent.express());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/auth', authRoute);
app.use('/api/v1/post', protect, postRoute);
app.use('/api/v1/user', protect, userRoute);

app.use('/', viewRoute);

app.all('*', (req, res, next) => {
    next(new AppError('Page Not found', 404));
});

app.use(globalErrorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`The app is live at ${PORT}`);
    console.log(`http://localhost:${PORT}`);
});
