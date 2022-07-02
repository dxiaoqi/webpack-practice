const { merge } = require('webpack-merge');
const common = require('./webpack.config.js');
exports.default = merge(common, {
  mode: 'production'
})