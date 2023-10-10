const execAsync = require('./execAsync');

module.exports = function (platform = 'android') {
    if (platform !== 'android') {
        throw new Error(`rebootDevice() missing implementation for platform: ${platform}`);
    }

    // -e is for emulator
    // return execAsync(`adb -e reboot`);
    return execAsync(`adb reboot`);
};
