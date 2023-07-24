const {merge} = require('webpack-merge');
const {TimeAnalyticsPlugin} = require('time-analytics-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const getCommonConfig = require('./webpack.common');

/**
 * Configuration for the a production build
 * that has profiling enabled.
 * @param {Object} env
 * @returns {Configuration}
 */
module.exports = (env = {}) => {
    const baseConfig = getCommonConfig(env);

    const config = merge(baseConfig, {
        mode: 'production',
        resolve: {
            alias: {
                'react-dom$': 'react-dom/profiling',
            },
        },
        optimization: {
            mangleExports: false,
            minimize: true,
            minimizer: [
                new TerserPlugin({
                    terserOptions: {
                        keep_classnames: true, // to prevent mangling of class names
                        keep_fnames: true, // to prevent mangling of function names
                        mangle: false,
                    },
                }),
            ],
        },
    });

    return TimeAnalyticsPlugin.wrap(config);
};
