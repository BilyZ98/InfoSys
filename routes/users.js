var express = require('express');
var router = express.Router();
var userController = require('../controllers/user-controller.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register',userController.register);

module.exports = router;
