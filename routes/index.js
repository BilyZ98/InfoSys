var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {

  //console.log(path.resolve(__dirname,'../public/html/index.html'));
  res.sendFile(path.resolve(__dirname,'../views/index.html'));
  //res.render('index', { title: 'Express' })
});

module.exports = router;