var express = require('express');
var router = express.Router();
const studentsController = require('../controllers/students-Controller.js');


router.post('/query', studentsController.queryOne);

router.post('/insert/basicInfo', studentsController.addBasicInfo);

router.post('/insert/family', studentsController.addFamily);

router.post('/insert/cadre', studentsController.addCadre);

router.post('/insert/award', studentsController.addAward);

router.post('/insert/paper', studentsController.addPaper);

router.post('/insert/patent', studentsController.addPatent);

router.post('/insert/techProject', studentsController.addTechProject);

router.post('/import', studentsController.batchInsertInfo);

router.post('/queryOne', studentsController.queryOne);

router.post('/queryAll', studentsController.queryAll);

router.post('/statistic', studentsController.statistic);

router.post('/update', studentsController.updateInfo);

router.post("/sendMail", studentsController.sendMail);

router.post("/insert/HMT", studentsController.addHMT);

router.post("/insert/internationalStudent",studentsController.addInterStu);

router.post("/FailedCourse",studentsController.getFailedCourseReacord);

router.post("/FailedStudents",studentsController.getFailedStudents);



module.exports = router;