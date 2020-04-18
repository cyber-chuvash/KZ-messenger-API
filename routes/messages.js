const express = require('express');
const Redis = require('ioredis');
const config = require('config');

const redisConfig = config.get('redisConfig');

const { SuccessResponse } = require('../responses/success');
const { ErrorResponse } = require('../responses/error');


const router = express.Router();

const redis = new Redis(redisConfig);

/*
    POST a message

    https://docs.kzm.chuvash.pw/#/default/post_messages
*/

router.post('/', function(req, res, next) {
    const {text, recipient_id: recipientId} = req.body;
    const senderId = req.auth.userId;

    if ( !text || !recipientId ) {
        res.status(400).send(new ErrorResponse(400, 'text and recipient_id fields must be present'));
        return;
    }

    const message = {
        sender_id: senderId,
        text: text
    };

    redis.publish(recipientId, JSON.stringify({ message }));

    res.status(200).send(new SuccessResponse(0));
});

module.exports = router;
