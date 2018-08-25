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
var session = require('express-session')
var MySQLStore = require('express-mysql-session')(session)



var index = require('./routes/index');
//var users = require('./routes/users');

var app = express();

//配置与封装功能
const resBody = require('./utils/resBody.js')
var sessConfig = require('./config/config.js')

//路由中间件
var studentsRouter = require('./routes/studentsRoutes.js');
var userRouter_b = require('./routes/users.js').beforeLogin;
var userRouter_a = require('./routes/users.js').afterLogin
/*
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
*/

//session 配置
const sc = sessConfig.session_schema
sc.store = new MySQLStore(sessConfig.session_config)
app.use(session(sc))

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'logo.png')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//use webpack
const compiler = webpack(config);


app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  stats: { colors: true }
}));

app.use(webpackHotMiddleware(compiler));

app.use('/users',userRouter_b);

/*
检查session，如果没有，则不往下继续执行，否则下面的路由可以执行
*/
app.use((req,res,next)=>{
  console.log('session request:')
  console.log(req.session)
  if(!req.session.user){
    resBody.fail(res,440,'NOT_LOGIN')
  }
  else {
    next()
  }
})

//routers
//app.use('/', index);
app.use('/students',studentsRouter);
app.use('/users',userRouter_a);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
