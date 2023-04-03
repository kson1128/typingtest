const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const path = require('path');
const ENVIRONMENT = process.env.NODE_ENV;

module.exports = {
  mode: ENVIRONMENT,
  entry: './index.js',
  output: {
    filename: 'bundle.js',
  },
  // devtool: 'source-maps',
  module: {
    rules: [
      {
        test: /\.(css)$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  // devServer: {
  //   static: {
  //     directory: path.join(__dirname, './'),
  //   },
  // },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
      inject: 'body',
    }),
    new Dotenv(),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
  ],
};
