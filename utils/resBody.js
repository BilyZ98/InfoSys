/**
  success 返回状态码200
  fail返回自定义状态码410+，自定义错误描述，用于可预见问题
  error 返回状态码 500， 用于不可预见信息，在controller的catch中调用
*/


const chalk = require('chalk')

exports.success = (res,content = null) => {
  res.status = 200;
  return res.json({
    content
  })
}


exports.fail = (res, statusCode = 440,err) => {
  res.status(statusCode)
  return res.json({
    err
  })
}

exports.error = (res,err) => {
  console.log(chalk.redBright.bold(err))
  res.status = 500
  return res.json({
    err
  })
}
