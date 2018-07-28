var express = require('express');
var router = express.Router();
const studentsController = require('../controllers/students-Controller.js');


router.post('/', studentsController.getStudentsInfo);


module.exports = router;
