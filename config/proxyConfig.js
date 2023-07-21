/**
 * These are the base API roots used to send requests to the proxy.
 * We only specify for staging URLs as API requests are sent to the production
 * servers by default.
 */
module.exports = {
    // eslint-disable-next-line rulesdir/no-api-in-views
    API: '/api',
    CHAT_ATTACHMENTS: '/chat-attachments/',
    STAGING: '/staging/',
    STAGING_SECURE: '/staging-secure/',
};
