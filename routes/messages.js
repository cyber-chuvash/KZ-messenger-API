const express = require('express');
const Redis = require('ioredis');
const config = require('config');

const { ValidationError, Op } = require("sequelize");

const redisConfig = config.get('redisConfig');

const { SuccessResponse } = require('../responses/success');
const { ErrorResponse } = require('../responses/error');

const models = require('../models');

const router = express.Router();

const redis = new Redis(redisConfig);

/*
    GET messages for the user
*/
router.get('/', async (req, res) => {
    const userId = req.auth.userId;

    let { limit, offset } = req.query;

    limit = parseInt(limit);
    offset = parseInt(offset);

    if (isNaN(limit)) limit = 20;
    if (isNaN(offset)) offset = 0;

    if (limit < 1 || limit > 200) {
        res.status(400).send(new ErrorResponse(400, 'limit must be between 1 and 200'));
        return;
    }
    if (offset < 0) {
        res.status(400).send(new ErrorResponse(400, 'offset can not be less than zero'));
        return;
    }

    const messages = await models.Message.findAll({
        where: {
            [Op.or]: [
                { recipientId: userId },
                { senderId: userId }
            ]
        },
        limit: limit,
        offset: offset,
    });

    const response = messages.map( (message) => {
        return {
            recipient_id: message.recipientId,
            text: message.text,
            sender_id: message.senderId,
        }
    } );
    res.send(new SuccessResponse(response));
});

/*
    POST a message
    https://docs.kzm.chuvash.pw/#/default/post_messages
*/
router.post('/', async (req, res) => {
    const {text, recipient_id: recipientId} = req.body;
    const senderId = req.auth.userId;

    if ( !text || !recipientId ) {
        res.status(400).send(new ErrorResponse(400, 'text and recipient_id fields must be present'));
        return;
    }

    try {
        await models.Message.create({ recipientId, senderId, text });
    } catch (e) {
        if (e instanceof ValidationError) {
            const err_message = e.errors[0].message;    // Just pick the first for now, TODO send the whole list
            res.status(400).send(new ErrorResponse(400, err_message));
            return;
        } else {
            throw e;
        }
    }

    const message = {
        sender_id: senderId,
        text: text
    };

    redis.publish(recipientId, JSON.stringify({ message }));

    res.status(200).send(new SuccessResponse(0));
});

module.exports = router;
