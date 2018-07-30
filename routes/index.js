var express = require('express');
var router = express.Router();
//require body-parser here to handle post data
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  //index.html是前端入口，webpack打包好的build.js户会注入这个文件
  res.sendFile(path.resolve(__dirname, '../views/index.html'));
});

router.post('/users/query', function(req, res, next) {
	console.log('data from query post: ' + req.data);
	res.json({'students': {name:'zhangsan', sid:'123'}});
})

module.exports = router;