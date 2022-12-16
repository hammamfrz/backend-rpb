const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const corsMiddleware = require('./middleware/cors');
const userRouter = require('./app/user/route');
const router = require('./routes');

const app = express();

app.use(corsMiddleware);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/user', userRouter);

module.exports = app;
