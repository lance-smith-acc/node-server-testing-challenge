const express = require('express');

const router = require('./routers/router');
const configureMiddleware = require('./middleware/configure-middleware');
const server = express();

configureMiddleware(server);

server.use('/api', router);

module.exports = server;
