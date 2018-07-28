const resBody = require('../utils/resBody.js');
var StudentsModel = require('../models/student-model.js');

exports.getStudentsInfo = async (req,res,next) => {
  let data = await  StudentsModel.getStudentInfo(req.body);
  console.log(JSON.stringify(data));
  resBody.success(res, data);
}
