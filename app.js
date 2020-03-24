const express = require('express');
const logger = require('morgan');

const messagesRouter = require('./routes/messages');

const app = express();


app.use(logger('dev'));
// app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/messages', messagesRouter);

module.exports = app;
