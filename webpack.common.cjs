const { resolve } = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { DefinePlugin } = require('webpack');

// 是否为开发环境
const isDEV = process.env.NODE_ENV === 'development';

// 路径别名
const srcAlias = [
  'router',
  'hook',
  'component',
  'util',
  'page',
  'service',
  'asset',
  'dto',
  'entity',
  'context',
  'store',
  'app',
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
    assetModuleFilename: 'asset/[hash][ext][query]',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|jpeg|gif|webp|svg)$/,
        type: 'asset/resource',
      },
      {
        test: /\.css$/,
        use: [
          isDEV ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
      {
        test: /\.less$/,
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
      cache: true,
      minify: 'auto',
      base: '/',
      externals: isDEV ? [] : [
        'https://unpkg.com/react@18.2.0/umd/react.production.min.js',
        'https://unpkg.com/react-dom@18.2.0/umd/react-dom.production.min.js',
      ]
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    new CopyPlugin({
      patterns: [
        { from: resolve('public', 'robots.txt'), to: resolve('dist', 'robots.txt') },
        { from: resolve('public', 'manifest.webmanifest'), to: resolve('dist', 'manifest.webmanifest') },
        { from: resolve('public', 'icon'), to: resolve('dist', 'icon') },
      ],
    }),
    new DefinePlugin({
      __REACT_DEVTOOLS_GLOBAL_HOOK__: '({ isDisabled: true })',
      'process.env': JSON.stringify(process.env),
    }),
  ],
  resolve: {
    extensions: ['.json', '.js', '.ts', '.tsx'],
    alias: srcAlias,
  },
  externals: isDEV ? {} : {
    'react': 'React',
    'react-dom': 'ReactDOM',
  }
};

module.exports = WebpackConfig;
