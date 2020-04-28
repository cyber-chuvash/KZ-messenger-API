const assert = require('assert').strict;

const express = require('express');
const logger = require('morgan');
const config = require('config');

const models = require('./models');

const corsConfig = config.get('corsConfig');
assert.ok('origin' in corsConfig);

const messagesRouter = require('./routes/messages');
const usersRouter = require('./routes/users');
const accountRouter = require('./routes/account');
const auth = require('./middleware/auth');

const app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", corsConfig.origin);
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");

    if (req.method === 'OPTIONS') {
        res.status(204).send();
        return;
    }

    next();
});

app.use(/^\/(?!account).*$/, auth());     // use for any path except /account

app.use('/messages', messagesRouter);
app.use('/users', usersRouter);
app.use('/account', accountRouter);

models.sequelize.sync({force: false});

module.exports = app;

if (require.main === module) {
    app.listen(80, () => { console.log('Listening on port 80') });
}
