const express = require('express');
const logger = require('morgan');

const messagesRouter = require('./routes/messages');
const auth = require('./middleware/auth');

const app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');     // TODO use actual origin
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");

    if (req.method === 'OPTIONS') {
        res.status(204).send();
        return;
    }

    next();
});

app.use(/^\/(?!auth).*$/, auth());     // use for any path except /auth

app.use('/messages', messagesRouter);

module.exports = app;
