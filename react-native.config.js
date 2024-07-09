const path = require("path");

module.exports = {
    project: {
        ios: {sourceDir: 'ios'},
        android: {},
    },
    assets: ['./assets/fonts/native'],
    dependencies: {
        'react-native-app-logs': {
            root: path.join(__dirname, '..', 'react-native-app-logs'),
        },
    },
};
