var express = require('express');
var router = express.Router();
const studentsController = require('../controllers/students-Controller.js');


//router.post('/query', studentsController.getStudentsInfo);
router.post('/query', studentsController.query);

router.post('/insert/basicInfo', studentsController.addBasicInfo);

router.post('/insert/family',studentsController.addFamily);

router.post('/insert/cadre',studentsController.addCadre);

router.post('/insert/award',studentsController.addAward);

router.post('/insert/paper',studentsController.addPaper);

router.post('/insert/patent',studentsController.addPatent);

router.post('/insert/techProject',studentsController.addTechProject);

router.post('/import',studentsController.batchInsertInfo );

router.post('/queryOne',studentsController.queryOne);

router.post('/queryAll',studentsController.queryAll);

module.exports = router;
