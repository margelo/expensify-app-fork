const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const defaultAssetExts = require('metro-config/src/defaults/defaults').assetExts;
const defaultSourceExts = require('metro-config/src/defaults/defaults').sourceExts;
const _ = require('underscore');
const path = require('path');
const escape = require('escape-string-regexp');
const exclusionList = require('metro-config/src/defaults/exclusionList');

require('dotenv').config();

const root = path.resolve(__dirname, '..');
const pak = require('../react-native-wishlist/package.json');

const modules = Object.keys({
    ...pak.peerDependencies,
});

const defaultConfig = getDefaultConfig(__dirname);

const isUsingMockAPI = process.env.E2E_TESTING === 'true';
if (isUsingMockAPI) {
    // eslint-disable-next-line no-console
    console.warn('⚠️ Using mock API');
}

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
    watchFolders: [__dirname, path.resolve(__dirname, '../react-native-wishlist')],
    resolver: {
        assetExts: _.filter(defaultAssetExts, (ext) => ext !== 'svg'),
        sourceExts: [...defaultSourceExts, 'jsx', 'svg'],
        resolveRequest: (context, moduleName, platform) => {
            const resolution = context.resolveRequest(context, moduleName, platform);
            if (isUsingMockAPI && moduleName.includes('/API')) {
                return {
                    ...resolution,
                    // TODO: Change API.mock.js extension once it is migrated to TypeScript
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
        babelTransformerPath: require.resolve('react-native-svg-transformer'),
    },
};

module.exports = mergeConfig(defaultConfig, config);
