const http = require('http');
const handler = require('serve-handler');
const _ = require('underscore');
const createProxy = require('./createProxy');
const proxyConfig = require('../config/proxyConfig');

/**
 * This server will serve the build under /dist and proxy all requests to the real API.
 */
const server = http.createServer((request, response) => {
    // if (_.values(proxyConfig, (urlPart) => request.url.startsWith(urlPart))) {
    if (_.some(proxyConfig, (urlPart) => request.url.startsWith(urlPart))) {
        createProxy(request, response);
    } else {
        return handler(request, response, {
            public: './dist',
        });
    }
});

server.listen(9000, () => {
    console.log('Proxy&Serve server listening at http://localhost:9000');
});
