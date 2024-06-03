const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');

const list = require('./list');
const upload = require('./upload');
const auth = require('./middlewares/auth');

const router = express.Router();

router.use('/_download', auth, express.static(path.join(process.cwd(), 'upload')));

router.post('/_upload', auth, fileUpload({}), upload);
router.get('/_list', auth, list);


module.exports = router;
