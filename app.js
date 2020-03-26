const express = require('express');
const logger = require('morgan');

const messagesRouter = require('./routes/messages');
const auth = require('./middleware/auth');

const app = express();


app.use(logger('dev'));
// app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(/^\/(?!auth).*$/, auth());     // use for any path except /auth

app.use('/messages', messagesRouter);

module.exports = app;
