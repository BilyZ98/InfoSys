const resBody = require('../utils/resBody.js');
var StudentsModel = require('../models/student-model.js');

exports.getStudentsInfo = async (req,res,next) => {
  let data = await  StudentsModel.getStudentInfo(req.body);
  console.log(JSON.stringify(data));
  resBody.success(res, data);
}

//数据库插入学生基本信息
exports.addBasicInfo = async (req,res,next) =>{
  let preCheck1 = await checkConflict(req.body)
  let preCheck2 = checkValidation(req.body)

  if(preCheck1 && preCheck2)
  {
    StudentsModel.addBasicInfo(req.body).then(() => {
      resBody.success(res)
    })
    .catch((err) => {
      resBody.error(res,err)
    })
  }
  else
  {
      if(!preCheck1)
      {
        resBody.fail(res,441, 'conflict_check_fail');
      }
      else {
        resBody.fail(res,442,'validation_check_fail');
      }
  }
}

exports.addFamily = async (req,res,next) => {
  let preCheck1 = await checkConflict(req.body)
  let preCheck2 = checkIDValid(req.body)

  if(preCheck1 && preCheck2)
  {
    StudentsModel.addFamily(req.body).then(() => {
      resBody.success(res)
    })
    .catch((err) => {
      resBody.error(res,err)
    })
  }
  else
  {
      if(!preCheck1)
      {
        resBody.fail(res,441, 'conflict_check_fail');
      }
      else {
        resBody.fail(res,442,'validation_check_fail');
      }
  }
}

exports.addCadre = async (req,res,next) => {
  let preCheck1 = await checkConflict(req.body)
  let preCheck2 = checkIDValid(req.body)

  if(preCheck1 && preCheck2)
  {
    StudentsModel.addCadre(req.body).then(() => {
      resBody.success(res)
    })
    .catch((err) => {
      resBody.error(res,err)
    })
  }
  else
  {
      if(!preCheck1)
      {
        resBody.fail(res,441, 'conflict_check_fail');
      }
      else {
        resBody.fail(res,442,'validation_check_fail');
      }
  }
}

exports.addAward = async (req,res,next) => {
  let preCheck1 = await checkConflict(req.body)
  let preCheck2 = checkIDValid(req.body)

  if(preCheck1 && preCheck2)
  {
    StudentsModel.addAward(req.body).then(() => {
      resBody.success(res)
    })
    .catch((err) => {
      resBody.error(res,err)
    })
  }
  else
  {
      if(!preCheck1)
      {
        resBody.fail(res,441, 'conflict_check_fail');
      }
      else {
        resBody.fail(res,442,'validation_check_fail');
      }
  }
}

exports.addPaper = async (req,res,next) => {
  let preCheck1 = await checkConflict(req.body)
  let preCheck2 = checkIDValid(req.body)

  if(preCheck1 && preCheck2)
  {
    StudentsModel.addPaper(req.body).then(() => {
      resBody.success(res)
    })
    .catch((err) => {
      resBody.error(res,err)
    })
  }
  else
  {
      if(!preCheck1)
      {
        resBody.fail(res,441, 'conflict_check_fail');
      }
      else {
        resBody.fail(res,442,'validation_check_fail');
      }
  }
}

exports.addPatent = async (req,res,next) => {
  let preCheck1 = await checkConflict(req.body)
  let preCheck2 = checkIDValid(req.body)

  if(preCheck1 && preCheck2)
  {
    StudentsModel.addPatent(req.body).then(() => {
      resBody.success(res)
    })
    .catch((err) => {
      resBody.error(res,err)
    })
  }
  else
  {
      if(!preCheck1)
      {
        resBody.fail(res,441, 'conflict_check_fail');
      }
      else {
        resBody.fail(res,442,'validation_check_fail');
      }
  }
}

exports.addTechProject = async (req,res,next) => {
  let preCheck1 = await checkConflict(req.body)
  let preCheck2 = checkIDValid(req.body)

  if(preCheck1 && preCheck2)
  {
    StudentsModel.addTechProject(req.body).then(() => {
      resBody.success(res)
    })
    .catch((err) => {
      resBody.error(res,err)
    })
  }
  else
  {
      if(!preCheck1)
      {
        resBody.fail(res,441, 'conflict_check_fail');
      }
      else {
        resBody.fail(res,442,'validation_check_fail');
      }
  }
}


//检测数据库中是否已有记录
async function checkConflict(body) {
  let check = await StudentsModel.checkStudent(body)
  return check.length === 0;
}


//检测格式是否正确
function checkValidation(body) {
  let id = new RegExp("^[0-9]{8}$");
  let idVali = id.test(body.sid);

  let tel = new RegExp("^[0-9]{11}$")
  let telVali = tel.test(body.tel)
  return idVali && telVali;
}

function checkIDValid(body) {
  let id = new RegExp("^[0-9]{8}$");
  let idVali = id.test(body.sid);

  return idVali;
}
