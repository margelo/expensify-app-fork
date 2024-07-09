const {getDefaultConfig} = require('expo/metro-config');
const {mergeConfig} = require('@react-native/metro-config');
const defaultAssetExts = require('metro-config/src/defaults/defaults').assetExts;
const defaultSourceExts = require('metro-config/src/defaults/defaults').sourceExts;
require('dotenv').config();

const exclusionList = require('metro-config/src/defaults/exclusionList');

const defaultConfig = getDefaultConfig(__dirname);

const isE2ETesting = process.env.E2E_TESTING === 'true';
const e2eSourceExts = ['e2e.js', 'e2e.ts', 'e2e.tsx'];

const path = require("path");
const root = path.resolve(__dirname, '../react-native-app-logs');

const modules = [
  "react",
  "react-native",
];

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
    watchFolders: [root],

    resolver: {
        assetExts: [...defaultAssetExts, 'lottie'],
        // When we run the e2e tests we want files that have the extension e2e.js to be resolved as source files
        sourceExts: [...(isE2ETesting ? e2eSourceExts : []), ...defaultSourceExts, 'jsx'],

        // We need to make sure that only one version is loaded for peerDependencies
        // So we block them at the root, and alias them to the versions in app node_modules
        blacklistRE: exclusionList(
          modules.map(
            (m) =>
              new RegExp(`^${escape(path.join(root, 'node_modules', m))}\\/.*$`)
          )
        ),

        extraNodeModules: modules.reduce((acc, name) => {
          acc[name] = path.join(__dirname, 'node_modules', name);
          return acc;
        }, {
          /*"react-native-app-logs": path.join(
            __dirname,
            "../",
            "react-native-app-logs",
          ),*/
        }),
    },
};

module.exports = mergeConfig(defaultConfig, config);
