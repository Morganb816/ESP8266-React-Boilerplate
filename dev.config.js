const path = require('path');

module.exports = {
    entry: [path.join(__dirname, './client/app.js')],
    mode: 'development',
    output: {
      path: path.join(__dirname, 'development', 'public'),
      filename: 'bundle.js',
    },
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },{
          test: /\.(s*)css$/,
          use: [
            'style-loader',
            'css-loader',
            'sass-loader',
          ]
        }
      ]
    }
  }
  