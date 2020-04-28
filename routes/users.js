const express = require('express');

const { SuccessResponse } = require('../responses/success');
const { ErrorResponse } = require('../responses/error');

const models = require('../models');

const usersRouter = express.Router();

usersRouter.get('/:userId', async (req, res) => {

    // Parse and check userId from path
    const userId = parseInt(req.params.userId);
    if (isNaN(userId) || !isFinite(userId) || userId < 0) {
        res.status(400).send(new ErrorResponse(400, 'user_id must be a non-negative integer'));
        return;
    }

    const user = await models.User.findByPk(userId);

    if (user === null) {
        res.status(404).send(new ErrorResponse(404, 'User not found'));
        return;
    }

    const response = {
        user_id: user.userId,
        email: user.email,
        full_name: {
            last_name: user.lastName,       // May be null
            first_name: user.firstName,     // Can't be null
            middle_name: user.middleName    // May be null
        }
    };

    res.status(200).send(new SuccessResponse(response));
});

module.exports = usersRouter;
