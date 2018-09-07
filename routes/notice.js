var express = require('express');
var router = express.Router();
const noticeController = require('../controllers/notice-controller.js')


router.post('/addNotice',noticeController.addNotice);

router.get('/getNotice', noticeController.getNotice);


module.exports = router
