const fs = require('fs');
const path = require('path');

const register = (req, res) => {
    const { user, password } = req.body;

    const usersJson = fs.readFileSync(path.join(process.cwd(), 'db', 'users.json'), 'utf-8');
    const users = JSON.parse(usersJson);

    if (users[user]) {
        res.status(403);

        res.json({
            message: 'user already exists',
        });

        return;
    }

    users[user] = password;

    fs.writeFileSync(path.join(process.cwd(), 'db', 'users.json'), JSON.stringify(
        users, null, 4
    ), 'utf-8');

    res.json({
        status: 'ok',
        user,
    });
};

module.exports = register;
