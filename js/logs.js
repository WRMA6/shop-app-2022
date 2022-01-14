/** logs.js: logging module that wraps the pino package */

const pino = require('pino');
const logger = pino({ level: process.env.LOG_LEVEL || 'info' });

function log(msg, obj=null) {
    if (process.env.NODE_ENV == 'test') return;
    if (obj) msg += ": " + JSON.stringify(obj);
    logger.info(msg);
}

module.exports = { logger, log };