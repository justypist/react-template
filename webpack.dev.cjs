const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const { DefinePlugin } = require('webpack');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    compress: true,
    port: 3000,
    allowedHosts: ['dev.typist.cc', 'localhost'],
    historyApiFallback: true,
    hot: true,
    https: false,
    open: false,
    client: {
      logging: 'warn',
      overlay: true,
      progress: true,
      reconnect: true,
    },
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new DefinePlugin({
      __REACT_DEVTOOLS_GLOBAL_HOOK__: '({ isDisabled: true })',
    }),
  ],
});
