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



async function checkConflict(body){
  let check = await userModel.checkUser(body)
  return check.length === 0
}
