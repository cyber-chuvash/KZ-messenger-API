const express = require('express');
const Redis = require('ioredis');

const { SuccessResponse } = require('../responses/success');
const { ErrorResponse } = require('../responses/error');


const router = express.Router();

const redis = new Redis({
    port: 6379, // Redis port
    host: "127.0.0.1", // Redis host
    // family: 4, // 4 (IPv4) or 6 (IPv6)
    // password: "auth",
    // db: 0
});

/*
    POST a message

Request model (urlencoded):
    text: str
    recipient_id: str(uuid)


Response model:
{
    response: message_id
}
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
