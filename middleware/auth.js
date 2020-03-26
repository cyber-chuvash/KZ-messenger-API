const { ErrorResponse } = require('../responses/error');


module.exports = () => {
    return async (req, res, next) => {

        // Check auth header
        const authHeader = req.header('Authorization');
        if (!authHeader) {
            res.status(401).send(new ErrorResponse(401, 'Authorization header is missing'));
            return;
        }

        // Get auth credentials from header
        const [ authType, authCredentials ] = authHeader.split(' ');
        if ( !authType || !authCredentials ) {
            res.status(401).send(new ErrorResponse(401, 'Authorization header is malformed'));
            return;
        }

        console.log(authType, ':', authCredentials);

        // TODO infer userId from token
        // For now userId = token
        const userId = authCredentials;

        req.auth = {
            userId
        };

        next();
    };
};
