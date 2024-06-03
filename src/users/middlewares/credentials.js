const credentials = (req, res, next) => {
    const { user, password } = req.body;

    if (user === undefined) {
        res.status(400);

        res.json({
            message: 'user required',
        });

        return;
    }

    if (password === undefined) {
        res.status(400);

        res.json({
            message: 'password required',
        });

        return;
    }

    next();
};

module.exports = credentials;
