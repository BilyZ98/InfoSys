var express = require('express');
var router = express.Router();
const studentsController = require('../controllers/students-Controller.js');


router.post('/query', studentsController.getStudentsInfo);

router.post('/insert/basicInfo', studentsController.addBasicInfo);



module.exports = router;