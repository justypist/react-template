const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolve } = require('path');

const srcAlias = [
  'app',
  'hook',
  'component',
  'util',
  'page',
].reduce((alias, subFolder) => {
  alias[`@${subFolder}`] = resolve(__dirname, 'src', subFolder);
  return alias;
}, {});

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
        test: /\.(less|css)$/i,
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
      favicon: resolve('public', 'favicon.ico'),
      meta: {
        'viewport': 'width=device-width, initial-scale=1'
      },
      hash: true,
      cache: true,
      inject: true,
      minify: 'auto',
    }),
  ],
  resolve: {
    extensions: ['.json', '.js', '.ts', '.tsx'],
    alias: srcAlias,
  },
};

module.exports = WebpackConfig;
