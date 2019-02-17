const resBody = require('../utils/resBody.js');
const userModel = require('../models/user-model.js');
const studentModel = require('../models/student-model.js')

exports.register = async(req, res, next) => {
  let preCheck = await checkConflict(req.body);
  if (preCheck) {
    userModel.addUser(req.body).then(() => {
        resBody.success(res)
      })
      .catch((err) => {
        resBody.error(res.err)
      })
  } else {
    resBody.fail(res, 441, 'conflict_check_fail')
  }
}

exports.checkSession = (req, res, next) => {
  if (req.session.user) {
    resBody.success(res, req.session.user)
  } else {
    resBody.fail(res, 441, 'NO_SESSION_INFO')
  }
}

exports.login = async(req, res, next) => {
  console.log('login:')
  console.log(req.session)
  let data = await userModel.getUser(req.body)
  if ((data.length !== 0 && data[0].password !== req.body.password) || data.length === 0) {
    resBody.fail(res, 441, 'PASSWORD_INCORRECT')
  } else {
    //let n_user = await userModel.getUser
    //登陆的时候就给session对象加上了user，这样，以后访问的时候，req session 就有user了
    //返回的content 里面包含了用户名
    console.log("登陆成功")
    req.session.user = data[0]
    resBody.success(res, data[0])
  }
}

exports.logout = (req, res, next) => {
  req.session.user = null
  resBody.success(res)
}

/*
注册账号，从数据库里得到数据再查找重复，再往表里面插入
*/
exports.registerAccount = async (req,res,next) => {
  let data = {
              "select":["basicInfo"],
              "where":{
                "equal":{},
                "range":{},
                "fuzzy":{}
              }
            }
  let allStudentBasicInfo = await studentModel.query(data) 
  for(let record in allStudentBasicInfo){
    let sid = allStudentBasicInfo[record]['basicInfo']['sid']
    let isExist = await checkStudnetAccountConflict(sid)
    if (isExist) {
      console.log("this sid has existed")
      continue  
    }
    let insertAccount = {
      "account":sid,
      "password":sid
    }
    let outcome = userModel.addStudentAccount(insertAccount)
    console.log(outcome)
  }
        
}

async  function checkStudnetAccountConflict(sid) {
  let check  = await userModel.checkStudentAccount(sid)
  return check.length === 0
}

async function checkConflict(body) {
  let check = await userModel.checkUser(body)
  return check.length === 0
}

