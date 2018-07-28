var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {

//console.log(path.resolve(__dirname,'../public/html/index.html'));
res.sendFile(path.resolve(__dirname,'../public/html/index.html'));
});

module.exports = router;
