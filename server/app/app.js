require('dotenv').config();

const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');

app.use(require('./middlewares/error'));
app.use(express.static(path.resolve(__dirname, '../../client/build')));

app.use(cors());
app.use(cookieParser());

app.use('/api/v1/security', require('../security/route'));
app.use('/api/v1/movement', require('../movement/route'));

module.exports = app;