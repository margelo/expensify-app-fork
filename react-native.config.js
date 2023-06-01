const path = require('path');

module.exports = {
    project: {
        ios: {sourceDir: 'ios'},
        android: {},
    },
    dependencies: {
        'react-native-flipper': {
            platforms: {
                ios: null,
            },
        },
        wishlist: {
            root: path.join(__dirname, '..', 'react-native-wishlist')
        }
    },
    assets: ['./assets/fonts/native'],
};
