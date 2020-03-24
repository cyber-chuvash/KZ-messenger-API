const express = require('express');
const Redis = require('ioredis');

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
    message: str
    recepient_id: str(uuid)


Response model:
{
    response: message_id
}
*/

router.post('/', function(req, res, next) {
    const {message, recipient_id: recipientId} = req.body;

    // TODO check params

    redis.publish(recipientId, message);

    res.status(200).send({response: 0})
});

module.exports = router;
