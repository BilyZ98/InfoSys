var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var config = require('./webpack.config');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var history = require('connect-history-api-fallback');


var app = express();

/**
 * 组建加载
 */

//配置与封装功能
var resBody = require('./utils/resBody.js');
var sessConfig = require('./config/config.js');

//路由中间件
var studentsRouter = require('./routes/studentsRoutes.js');
var userRouter_b = require('./routes/users.js').beforeLogin;
var userRouter_a = require('./routes/users.js').afterLogin;

/**
 * webpack配置
 */

const compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  stats: { colors: true }
}));
app.use(webpackHotMiddleware(compiler));

/**
 * session配置
 */

const sc = sessConfig.session_schema
sc.store = new MySQLStore(sessConfig.session_config)
app.use(session(sc))

/**
 * 路由配置
 * 使用connect-history-api-fallback中间件，实现vue-spa
 * 其中history会把所有get方式的页面请求都返回index.html
 */

app.use(history({
  htmlAcceptHeaders: ['text/html', 'application/xhtml+xml']
}));
//路由处理组件
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//路由
app.use(express.static(path.join(__dirname, 'public')));
app.use('/users', userRouter_b);

/**
 * 检查session，如果没有，则不往下继续执行，否则下面的路由可以执行
 */

app.use((req, res, next) => {
  console.log('session request:')
  console.log(req.session)
  if (!req.session.user) {
    resBody.fail(res, 440, 'NOT_LOGIN')
  } else {
    next()
  }
})

app.use('/students', studentsRouter);
app.use('/users', userRouter_a);

/*
// error handler
app.use(function(err, req, res, next) {
  res.sendFile('./public/invalid.html')
  next()
});
*/

module.exports = app;