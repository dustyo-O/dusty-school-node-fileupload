const fs = require('fs');
const path = require('path');

const credentials = (req, res, next) => {
    const token = req.get('X-DocApi-Token');

    if (token === undefined) {
        res.status(400);

        res.json({
            message: 'X-DocApi-Token required',
        });

        return;
    }

    const existingTokensJson = fs.readFileSync(path.join(process.cwd(), 'db', 'tokens.json'), 'utf-8');
    const existingTokens = JSON.parse(existingTokensJson);

    const user = existingTokens[token];

    if (!user) {
        res.status(401);

        res.json({
            message: 'token does not exist',
        });

        return;
    }

    req.auth = {
        user, token,
    };

    next();
};

module.exports = credentials;
