const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const WorkboxPlugin = require('workbox-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

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
      // 1GiB
      maximumFileSizeToCacheInBytes: 1024 * 1024 * 1024,
      clientsClaim: true,
      skipWaiting: true,
      runtimeCaching: [
        {
          urlPattern: /https:\/\/fonts(\.gstatic)?\.googlefonts\.cn\//,
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'google-fonts',
          },
        },
        {
          urlPattern: /https:\/\/unpkg\.com\//,
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'unpkg',
          },
        },
      ],
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: process.env.ENABLE_ANALYZER ? 'server' : 'disabled',
    }),
  ]
});
