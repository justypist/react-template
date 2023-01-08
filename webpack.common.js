const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolve } = require('path');

const WebpackConfig = {
  entry: {
    index: resolve('src', 'index.tsx'),
  },
  output: {
    filename: 'index.[contenthash].js',
    path: resolve('dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.jpg/,
        type: 'asset',
      },
      {
        test: /\.less$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: false,
            },
          },
          'less-loader',
        ],
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve('public', 'index.html'),
      filename: resolve('dist', '[name].html'),
      favicon: false,
      hash: true,
      cache: true,
      inject: true,
      minify: 'auto',
    }),
  ],
  resolve: {
    extensions: ['.json', '.js', '.ts', '.tsx'],
    alias: {},
  },
};

module.exports = WebpackConfig;
