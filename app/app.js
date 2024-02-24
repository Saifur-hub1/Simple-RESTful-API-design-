require('dotenv').config('../.env');
const express = require('express');
const {errorHandler, notFoundHandler} = require('./error');

const app = express();

const database = require('../db/db');

app.use(require('./middleware')); 
app.use(require('./router'));
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;