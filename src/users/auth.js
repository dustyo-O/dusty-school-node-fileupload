const fs = require('fs');
const path = require('path');
const { uid } = require('uid');

const auth = (req, res) => {
    const { user, password } = req.body;

    const usersJson = fs.readFileSync(path.join(process.cwd(), 'db', 'users.json'), 'utf-8');
    const users = JSON.parse(usersJson);
    const dbPassword = users[user];

    if (!dbPassword || dbPassword !== password) {
        res.status(401);

        res.json({
            message: 'user or password were incorrect',
        });

        return;
    }

    let token;

    const existingTokensJson = fs.readFileSync(path.join(process.cwd(), 'db', 'tokens.json'), 'utf-8');
    const existingTokens = JSON.parse(existingTokensJson);

    do {
        token = uid(5);
    } while(existingTokens[token]);

    existingTokens[token] = user;

    fs.writeFileSync(path.join(process.cwd(), 'db', 'tokens.json'), JSON.stringify(
        existingTokens, null, 4
    ), 'utf-8');

    res.json({
        status: 'ok',
        user,
        token,
    });
};

module.exports = auth;
