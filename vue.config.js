const webpack = require('webpack');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = {
  devServer: {
    open: true,
    // proxy: { },
  },
  configureWebpack: {
    plugins: [new MonacoWebpackPlugin()]
  },
};
