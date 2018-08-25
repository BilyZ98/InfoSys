const resBody = require('../utils/resBody.js');
const userModel = require('../models/user-model.js');

exports.register = async(req,res,next) => {
  let preCheck = await checkConflict(req.body);
  if(preCheck)
  {
    userModel.addUser(req.body).then(() => {
      resBody.success(res)
    })
    .catch((err) => {
      resBody.error(res.err)
    })
  }
  else
  {
    resBody.fail(res,441,'conflict_check_fail')
  }
}

exports.checkSession = (req,res,next) =>{
  if(req.session.user){
    resBody.success(res,req.session.user)
  }
  else {
    resBody.fail(res,441,'NO_SESSION_INFO')
  }
}

exports.login = async(req,res,next)=>{
  let data = await userModel.getUser(req.body)
  if((data.length !== 0 && data[0].password !==req.body.password) || data.length ===0){
    resBody.fail(res,441,'PASSWORD_INCORRECT')
  }
  else {
    //let n_user = await userModel.getUser
    req.session.user = data[0]
    resBody.success(res,data[0])
  }
}

exports.logout = (req,res,next)=>{
  req.session.user = null
  resBody.success(res)
}

async function checkConflict(body){
  let check = await userModel.checkUser(body)
  return check.length === 0
}
