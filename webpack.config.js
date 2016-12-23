/* eslint-disable import/no-extraneous-dependencies */
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { HotModuleReplacementPlugin } = require('webpack')
const config = require('./server/config')

module.exports = {
  entry: ['./src/index.ts'],
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: config.assets.fullUrl,
    filename: '[name].[hash].js',
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    loaders: [{
      test: /\.ts$/,
      loader: 'ts-loader',
      exclude: /node_modules/,
    }, {
      test: /\.(png|jpg)/,
      loader: 'file-loader',
    }],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './src/index.html' }),
    new HotModuleReplacementPlugin(),
  ],
}
