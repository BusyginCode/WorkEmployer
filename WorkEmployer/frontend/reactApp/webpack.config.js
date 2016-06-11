'use strict';

var webpack = require('webpack'),
    path = require('path');

module.exports = {

  entry: {
    app: './app',
  },

  output: {
    path: path.join(__dirname, '../../static/js'),
    filename: "bundle.js",
  },

  resolve: {
    extensions: ['', '.js', '.jsx', '.json'],
    alias: {
      utils: __dirname + '/utils',
      components: __dirname + '/components',
      // actionClasses: __dirname + '/../additional/actionClasses/actionClasses',
      // dispatcher: __dirname + '/reactApp/dispatcher/dispatcher',
      // consts: __dirname + '/reactApp/consts/consts',
      // screen: __dirname + '/../additional/screen/screen'
    },
  },

  module: {
    loaders: [
      {
        test: [/\.jsx$/, /\.js$/],
        exclude: /(node_modules)/,
        loader: 'babel',
        query: {
          plugins: ['babel-plugin-add-module-exports'],
          // https://github.com/babel/babel-loader#options
          presets: ['es2015', 'stage-0', 'react']
        }
      },
    ],
  },

  plugins: [
    new webpack.ProvidePlugin({
      React: 'react',
      ReactDOM: 'react-dom',
    }),
  ],

  devtool: 'source-map'

}