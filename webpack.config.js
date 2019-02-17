var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  //entry: path.join(__dirname, './client/index.js'),
  entry: ['babel-polyfill','./client/index.js'],
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
      }
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