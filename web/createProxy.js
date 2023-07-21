const https = require('https');
const proxyConfig = require('../config/proxyConfig');
require('dotenv').config();

const host = 'www.expensify.com';
const stagingHost = 'staging.expensify.com';
const stagingSecureHost = 'staging-secure.expensify.com';

console.log(`Creating proxy with host: ${host} for production API and ${stagingHost} for staging API`);

function createProxy(request, response) {
    let hostname = host;
    let requestPath = request.url;

    /**
     * When a request is matching a proxy config path we might direct it to a different host (e.g. staging)
     * For requests matching proxy config patterns we replace the mapping url (prefix) with the actual path.
     * This is done because the staging api root is only intended for the proxy,
     * the actual server request must use the /api path.
     * For example,
     * /api?command=OpenReport => request sent to production server
     * /staging/api?command=OpenReport => request sent to staging server
     * /staging-secure/api?command=OpenReport => request sent to secure staging server
     * /chat-attachments/46545... => request sent to production server
     * /staging/chat-attachments/46545... => request sent to staging server
     */
    if (request.url.startsWith(proxyConfig.STAGING_SECURE)) {
        hostname = stagingSecureHost;
        requestPath = request.url.replace(proxyConfig.STAGING_SECURE, '/');
    } else if (request.url.startsWith(proxyConfig.STAGING)) {
        hostname = stagingHost;
        requestPath = request.url.replace(proxyConfig.STAGING, '/');
    }

    const proxyRequest = https.request({
        hostname,
        method: 'POST',
        path: requestPath,
        headers: {
            ...request.headers,
            host: hostname,
            'user-agent': request.headers['user-agent'].concat(' Development-NewDot/1.0'),
        },
        port: 443,
    });

    request.pipe(proxyRequest);
    proxyRequest.on('response', (proxyResponse) => {
        response.writeHead(proxyResponse.statusCode, proxyResponse.headers);
        proxyResponse.pipe(response);
    });

    proxyRequest.on('error', (error) => {
        /* eslint-disable-next-line no-console */
        console.log(error);
    });
}

module.exports = createProxy;
