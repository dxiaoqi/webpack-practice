const { merge } = require('webpack-merge');
const common = require('./webpack.config.js');
exports.default = merge(common, {
  mode: 'development',
  devServer: {
    // contentBase: './dist',
    compress: true,
    port: 3000
  }
})