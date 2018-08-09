const resBody = require('../utils/resBody.js');
var StudentsModel = require('../models/student-model.js');

//根据学生的id 进行查询
exports.getStudentsInfo = async (req,res,next) => {
  let data = await  StudentsModel.getStudentInfo(req.body);
  console.log(JSON.stringify(data));
  resBody.success(res, data);
}

//范式， 用于学生插入基本信息
async function template(req,res,next,concrete, table){
  let preCheck1 = await checkConflict(req.body, table)
  let preCheck2 = checkIDValid(req.body)

  if(preCheck1 && preCheck2)
  {
    //StudentsModel.addFamily(req.body)
    concrete(req.body).then(() => {
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

//写一个导入的函数
exports.batchInsertInfo = async (req,res,next) => {
  let body = req.body
  let batchInfo = body['batchInfo']
  for(one in batchInfo){
    let preCheck = await checkConflict(batchInfo[one])
    if(preCheck){
      StudentsModel.insertOne(body['table'],body['field'],batchInfo[one])
      .then(()=>{
        resBody.success(res)
      })
      .catch((err)=>{
        resBody.error(res,err);
      })
    }
    else {
      StudentsModel.updateOne(body['table'],body['field'],batchInfo[one])
      .then(()=>{
        resBody.success(res)
      })
      .catch((err)=>{
        resBody.error(res,err)
      })
    }
  }

}



//表示查询，传入json 格式见 testJson.js，用于多表连接
exports.query = async (req,res,next) => {
  console.log("query fuck")
  console.log(req.body)
  StudentsModel.query(req.body).then((data)=>{
    console.log(data);
    resBody.success(res,data)
  })
  .catch((err)=>{
    resBody.error(res,err);
  })

}


//数据库插入学生基本信息
exports.addBasicInfo = async (req,res,next) =>{
  let preCheck1 = await checkConflict(req.body,'basicInfo')
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

exports.addFamily =  async (req,res,next) =>{
 template(req,res,next,StudentsModel.addFamily, "family")
}


exports.addCadre = async (req,res,next) => {
  template(req,res,next,StudentsModel.addCadre,"cadre");
}

exports.addAward = async (req,res,next) => {
  template(req, res, next, StudentsModel.addAward, "award");
}

exports.addPaper = async (req,res,next) =>{
  template(req,res,next,StudentsModel.addPaper,"paper");
}


exports.addPatent = async (req,res,next) =>
{
  template(req,res,next,StudentsModel.addPatent, "patent");
}


exports.addTechProject = async (req,res,next) => {
  template(req,res,next, StudentsModel.addTechProject,"techProject");
}



//检测数据库中是否已有记录
async function checkConflict(body, table) {
  let check = await StudentsModel.checkStudent(body,table)
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
