const path = require('path');

module.exports = {
    entry: [path.join(__dirname, './client/app.js')],
    mode: 'production',
    output: {
      path: path.join(__dirname, 'production', 'server', 'data'),
      filename: 'bundle.js',
    },
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
  