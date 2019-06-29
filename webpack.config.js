/* eslint-disable no-undef */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry:'./src/script.js'
  ,
  output: {
    filename: 'app.bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: 'source-map',
  module: {
    rules: [
      { enforce: 'pre', test: /\.js$/, loader: 'eslint-loader' },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|svg)$/,
        loader: 'url-loader'
      },
      /* {
        test: /\.(html)$/,
        use: [
          {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'edit/'
          }
        }
        ],
        exclude: path.resolve(__dirname,'src/screen/index.html'),
      } */
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/screen/index.html',
    }),
    new HtmlWebpackPlugin({
      filename: 'edit/index.html',
      template: './src/screen/edit/index.html',
    }),
  ],
};
