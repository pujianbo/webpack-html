var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var glob = require('glob');
var webConfig = require('./src/config');

var plugins = [];
var html_plugins = function() {
  var entryHtml = glob.sync(__dirname + '/src/Page/*.html')
  var htmlProduct = [];
  for (var i = 0; i < entryHtml.length; i++) {
    var fileName = entryHtml[i].slice(entryHtml[i].lastIndexOf('/') + 1, -5);
    var conf = {
      template: './src/Page/' + fileName + '.html',
      filename: fileName + '.html',
      favicon: __dirname + '/src/img/logo.ico',
      inject: 'body',
      title: fileName
    }
    htmlProduct.push(new HtmlWebpackPlugin(conf))
  }
  return htmlProduct;
}
plugins.push(new ExtractTextPlugin('Css/[name].css'));
plugins.push(
  new BrowserSyncPlugin({
    host: webConfig.getIP(),
    port: webConfig.port + 1,
    files: '**',
    files: 'src/*',
    files: 'build/*',
    files: 'index.html',
    server: {
      baseDir: ['./build']
    }
  })
);


module.exports = {
  entry: {
    public: ['./src/app']
  },
  output: {
    // publicPath:'/',
    path: path.join(__dirname, 'build'),
    filename: 'Js/[name].js'
  },
  devServer: {
    port: webConfig.port,
    host: webConfig.getIP(),
    proxy: webConfig.getAgent()
  },
  module: {
    loaders: [{
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      {
        test: /\.(less|scss)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.(js|css|scss|jsx)$/,
        loader: 'webpack-px-to-rem',
        query: {
          basePx: 28,
          min: 1,
          floatWidth: 2
        }
      },
      {
        test: /\.(png|jpg|gif|ico)$/,
        loader: 'url-loader?limit=5000&name=../Img/icon/[name].[ext]'
      },
      {
        test: /\.(eot|woff|ttf|svg)$/,
        loader: 'url-loader?limit=25000&name=../[ext]/[name][hash:8].[ext]'
      }
    ]
  },
  plugins: plugins.concat(html_plugins()),
  resolve: {
    extensions: [' ', '.js', '.jsx']
  }
};
