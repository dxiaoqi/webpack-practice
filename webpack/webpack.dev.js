const { merge } = require('webpack-merge');
const path = require('path');
const common = require('./webpack.config.js');
exports.default = merge(common, {
  mode: 'development',
  devServer: {
    static: {
      directory: path.join(__dirname, '../dist'),
    },
    compress: true,
    port: 3000
  }
})