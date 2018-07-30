var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  //index.html是前端入口，webpack打包好的build.js户会注入这个文件
  res.sendFile(path.resolve(__dirname, '../views/index.html'));
});

module.exports = router;