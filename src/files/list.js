const fs = require('fs');
const path = require('path');

const list = (req, res) => {
    const documentsJson = fs.readFileSync(path.join(process.cwd(), 'db', 'documents.json'), 'utf-8');
    const documents = JSON.parse(documentsJson);

    res.json({
        documents: documents.filter((document) => document.user === req.auth.user),
    });
};

module.exports = list;
