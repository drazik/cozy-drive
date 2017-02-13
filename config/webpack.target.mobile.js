'use strict'

const path = require('path')
const webpack = require('webpack')

const {production} = require('./webpack.vars')

module.exports = {
  entry: path.resolve(__dirname, '../mobile/src/main'),
  output: {
    path: path.resolve(__dirname, '../mobile/www')
  },
  module: {
    noParse: [
      /localforage\/dist/
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      __ALLOW_HTTP__: !production,
      __TARGET__: JSON.stringify('mobile')
    })
  ]
}