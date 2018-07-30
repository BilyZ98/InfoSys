var express = require('express');
var router = express.Router();
const studentsController = require('../controllers/students-Controller.js');


router.post('/', studentsController.getStudentsInfo);

router.post('/addBasicInfo',studentsController.addBasicInfo);

module.exports = router;
