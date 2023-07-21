const http = require('http');
const createProxy = require('./createProxy');
require('dotenv').config();

if (process.env.USE_WEB_PROXY === 'false') {
    process.stdout.write('Skipping proxy as USE_WEB_PROXY was set to false.\n');
    process.exit();
}

/**
 * Local proxy server that hits the production endpoint
 * to get around CORS issues. We use this so that it's
 * possible to work on the app within a limited development
 * environment that has no local API.
 */

const server = http.createServer((request, response) => {
    createProxy(request, response);
});

server.listen(9000, () => {
    console.log('Proxy server listening at http://localhost:9000');
});
