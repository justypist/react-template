const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { resolve } = require('path');

// 是否为开发环境
const isDEV = process.env.NODE_ENV === 'development';

// 路径别名
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
          isDEV ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
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
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
  ],
  resolve: {
    extensions: ['.json', '.js', '.ts', '.tsx'],
    alias: srcAlias,
  },
};

module.exports = WebpackConfig;
