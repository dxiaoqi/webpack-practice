const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const glob = require('glob');

const setMPA = () => {
  const entry = {};
  const htmlWebpackPlugins = [];
  // 可以去在options设置根路径
  const entryFiles = glob.sync('/pages/**/**.ts', {
    absolute: true,
    root: path.resolve(__dirname, '../src')
  });
  entryFiles.forEach(filePath => {
    // 之匹配一级目录
    const match = filePath.match(/pages\/([a-z].*?)\//);
    const pageName = match && match[1];
    if (pageName) {
      entry[pageName] = filePath;
      htmlWebpackPlugins.push(
        new HtmlWebpackPlugin({
          template: path.join(__dirname, `../src/index.html`),
          filename: `${pageName}/index.html`,
          chunks: ['vendor', 'common', pageName],
          inject: true,
        })
      );
    }
  }
  );
  return {
    entry,
    plugins: [...htmlWebpackPlugins]
  };
}
const mpa = setMPA();
module.exports = {
  entry: mpa.entry, //'./src/dom.tsx',
  output: {
    path: path.resolve(__dirname,'../', 'dist'),
    filename: '[name]/index.js'
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      use: 'ts-loader',
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }, {
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader']
    }, {
      test: /\.png|jpe?g$/,
      use: ['file-loader']
    }]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(),
  ].concat(mpa.plugins)
}