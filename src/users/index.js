const express = require('express');

const register = require('./register');
const auth = require('./auth');
const credentials = require('./middlewares/credentials');

const router = express.Router();

router.use(express.json());
router.use(credentials);

router.post('/_register', register);
router.post('/_auth', auth);

module.exports = router;
