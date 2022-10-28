const {APP_PACKAGE} = require('../config');
const execAsync = require('./execAsync');

module.exports = function (platform = 'android', argsString) {
    if (platform !== 'android') {
        throw new Error(`launchApp() missing implementation for platform: ${platform}`);
    }

    // Use adb to start the app
    let command = `adb shell am start -n ${APP_PACKAGE}/.MainActivity`
    if (argsString) {
        command += ` ${argsString}`;
    }

    return execAsync(command);
};
