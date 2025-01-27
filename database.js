const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, 'config.env') });


const URI = process.env.DATA_BASE_URI.replace(
    '<password>',
    process.env.DATA_BASE_PASSWORD
);

mongoose
    .connect(URI)
    .then(() => console.log('Connected to the database successfully'))
    .catch((err) => console.log(`An error occured!\n${err}`));
