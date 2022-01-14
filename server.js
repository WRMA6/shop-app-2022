const express = require('express');
const app = express();
const logs = require("./js/logs");
const expressPino = require('express-pino-logger');
const expressLogger = expressPino(logs.logger);
const bodyParser = require('body-parser');
const baseRouter = require('./routes/base/router');
const db = require('./js/db');
const port = process.env.PORT || 3000;

async function main () {
    if (process.env.NODE_ENV != 'test') {
        app.use(expressLogger);
    }

    app.use(express.static('public'));
    app.set('view engine', 'ejs');

    app.use(bodyParser.urlencoded({ extended: true }));

    app.use('/', baseRouter);

    app.use('/js', express.static(__dirname + 'public/js'));

    if (!await db.connectDb()) process.exit();

    // Listen on port 3000
    app.listen(port, () => logs.log(`Listening on port ${port}`));
}

main();