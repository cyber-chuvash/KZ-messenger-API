const express = require('express');

const { ValidationError } = require("sequelize");

const { SuccessResponse } = require('../responses/success');
const { ErrorResponse } = require('../responses/error');

const models = require('../models');

const accountRouter = express.Router();

// Create an account
accountRouter.post('/', async (req, res) => {
    const { email, full_name: fullName } = req.body;

    // check needed fields
    if (!(email && fullName)) {
        res.status(400).send(new ErrorResponse(400, 'Both email and full_name are required'));
        return;
    }
    const { first_name: firstName, middle_name: middleName, last_name: lastName } = fullName;
    if (!firstName) {
        res.status(400).send(new ErrorResponse(400, 'full_name.first_name is required'));
        return;
    }

    // Create a model for the new account (does NOT run any SQL)
    const createdAccount = await models.User.build({
        email,
        firstName,
        middleName,
        lastName,
    });

    try {
        // Save the model
        await createdAccount.save();
    } catch (e) {
        if (e instanceof ValidationError) {     // If some of the sequlize validations failed
            const err_message = e.errors[0].message;    // Just pick the first for now, TODO send the whole list
            res.status(400).send(new ErrorResponse(400, err_message));
            return;
        } else {
            throw e;
        }
    }
    // Respond with the new model's userId
    res.status(200).send(new SuccessResponse({ "user_id": createdAccount.userId }));
});

module.exports = accountRouter;
