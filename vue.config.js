const webpack = require('webpack');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = {
  devServer: {
    open: true,
    // proxy: { },
  },
  configureWebpack: {
    plugins: [new MonacoWebpackPlugin({
      languages: [
        'xml',
        'html',
        'scala',
        'shell',
        'sql',
        'json',
        'java',
        'javascript',
        'typescript',
        'yaml',
        'mysql',
      ],
    })]
  },
};
