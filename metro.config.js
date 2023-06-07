/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 */

const {getDefaultConfig} = require('metro-config');
const _ = require('underscore');
require('dotenv').config();
const path = require('path');

const root = path.resolve(__dirname, '..');
const pak = require('../react-native-wishlist/package.json');

const escape = require('escape-string-regexp');
const exclusionList = require('metro-config/src/defaults/exclusionList');

const modules = Object.keys({
    ...pak.peerDependencies,
});

/* eslint arrow-body-style: 0 */
module.exports = (() => {
    const isUsingMockAPI = process.env.E2E_TESTING === 'true';
    if (isUsingMockAPI) {
        // eslint-disable-next-line no-console
        console.warn('⚠️ Using mock API');
    }

    return getDefaultConfig().then((config) => {
        return {
            watchFolders: [__dirname, path.resolve(__dirname, '../react-native-wishlist')],
            resolver: {
                assetExts: _.filter(config.resolver.assetExts, (ext) => ext !== 'svg'),
                sourceExts: ['jsx', 'js', 'ts', 'tsx', 'json', 'svg'],
                resolveRequest: (context, moduleName, platform) => {
                    const resolution = context.resolveRequest(context, moduleName, platform);
                    if (isUsingMockAPI && moduleName.includes('/API')) {
                        return {
                            ...resolution,
                            filePath: resolution.filePath.replace(/src\/libs\/API.js/, 'src/libs/E2E/API.mock.js'),
                        };
                    }
                    return resolution;
                },
                blacklistRE: exclusionList(modules.map((m) => new RegExp(`^${escape(path.join(root, 'react-native-wishlist', 'node_modules', m))}\\/.*$`))),
                extraNodeModules: modules.reduce((acc, name) => {
                    acc[name] = path.join(__dirname, 'node_modules', name);
                    return acc;
                }, {}),
            },
            transformer: {
                getTransformOptions: () => ({
                    transform: {
                        experimentalImportSupport: false,
                        inlineRequires: true,
                    },
                }),
                babelTransformerPath: require.resolve('react-native-svg-transformer'),
            },
        };
    });
})();
