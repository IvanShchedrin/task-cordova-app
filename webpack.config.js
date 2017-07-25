var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var extractSass = new ExtractTextPlugin({
  filename: "styles.css"
});

module.exports = {
  entry: ['./src/index'],
  output: {
    path: path.join(__dirname, 'www'),
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin(),
    extractSass
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['babel-loader'],
      include: path.join(__dirname, 'src')
    }, {
      test: /\.scss$/,
      use: extractSass.extract({
        use: [
          { loader: "css-loader"},
          { loader: "autoprefixer-loader?browsers=last 2 versions" },
          { loader: "sass-loader" }
        ]
      })
    }]
  }
};