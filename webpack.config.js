var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')

//require('bootstrap-loader')

module.exports = {
  //entry: path.join(__dirname, './client/index.js'),
  entry: [
    //'bootstrap-loader',
    'babel-polyfill',
    './client/index.js'
  ],
  output: {
    path: path.join(__dirname, './public/dist'),
    publicPath: '/dist/',
    filename: 'build.js'
  },
  mode: 'development',
  /*
  resolve: {
    extensions: ['.js', '.vue']
  },
  resolveLoader: {
    root: path.join(__dirname, 'node_modules')
  },
  */
  module: {
    rules: [{
        test: /\.vue$/,
        use: 'vue-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      },
      /*
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: 'url-loader?limit=10000',
      },
      {
        test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
        use: 'file-loader',
      },
      { test: /\.(woff2?|svg)$/, loader: 'url-loader?limit=10000' },
      { test: /\.(ttf|eot)$/, loader: 'file-loader' }*/
      /*{test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/ ,loader : 'file?limit=10000&mimetype=application/font-woff&name=/font/[name]-[hash:8].[ext]'},
      {test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/, loader : 'file?name=/font/[name]-[hash:8].[ext]'}*/
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        jquery: 'jquery'
    })
    //自动在打包后的/dist目录下生成index.html入口文件，但是cdn引入的js都没有，不好
    //new HtmlWebpackPlugin()
  ],
  resolve: {
    alias: {
      vue: 'vue/dist/vue.js'
    }
  }
}