const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  optimization: {
    runtimeChunk: 'single',
    minimizer: [
      '...',
      new CssMinimizerPlugin(),
    ],
  },
  plugins: [
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
      maximumFileSizeToCacheInBytes: 1024 * 1024 * 10,
    }),
  ]
});
