const resBody = require('../utils/resBody.js');
var StudentsModel = require('../models/student-model.js');

exports.getStudentsInfo = async (req,res,next) => {
  let data = await  StudentsModel.getStudentInfo();
  resBody.success(res, data);
}
