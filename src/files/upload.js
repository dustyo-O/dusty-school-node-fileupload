const fs = require('fs');
const path = require('path');

const upload = (req, res) => {
    const { name, md5 } = req.files.document;

    let extension = name.split('.').pop();

    if (extension === name) {
        extension = '';
    }

    req.files.document.mv(path.join(process.cwd(), 'upload', `${md5}.${extension}`), (err) => {
        if (err) {
            res.status(500);

            res.json(err);

            return;
        }

        const documentsJson = fs.readFileSync(path.join(process.cwd(), 'db', 'documents.json'), 'utf-8');
        const documents = JSON.parse(documentsJson);

        documents.push({
            originFilename: name.slice(0, extension ? -extension.length - 1 : undefined),
            extension: extension,
            filename: md5,
            user: req.auth.user,
        });

        fs.writeFileSync(path.join(process.cwd(), 'db', 'documents.json'), JSON.stringify(
            documents, null, 4,
        ), 'utf-8');

        res.json({
            filename: md5,
            link: '/files/_download/' + md5 + '.' + extension,
            extension,
            status: 'ok',
        });
    });

};

module.exports = upload;
