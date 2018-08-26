/**
  success 返回状态码200
  fail返回自定义状态码410+，自定义错误描述，用于可预见问题
  error 返回状态码 500， 用于不可预见信息，在controller的catch中调用
*/


const chalk = require('chalk')

/**
 * 成功，状态码为200，内容为Object或String或为空
 * @param {Object} res 标准http.serverResponse类型
 * @param {?(Object|String)} content 成功状态下返回的内容，建议GET请求中使用
 */

exports.success = (res,content = null) => {
  res.status = 200;
  return res.json({
    content
  })
}

/**
 * 自定义失败情景，状态码为44x，内容为错误描述。
 * 其中状态码缺省为440，表示未登录状态下请求了登录才可用的api
 * @param {Object} res 标准http.serverResponse类型
 * @param {number=} statusCode 状态码，从440开始，缺省值440
 * @param {string} err 错误描述，简要描述该错误原因
 */

exports.fail = (res, statusCode = 440,err) => {
  res.status(statusCode)
  return res.json({
    err
  })
}


/**
 * 未知错误情景，建议在catch任何error后调用本函数。
 * 会自动输出错误信息在控制台
 * @param {Object} res 标准http.serverResponse类型
 * @param {string} err 错误描述
 */

exports.error = (res,err) => {
  console.log(chalk.redBright.bold(err))
  res.status = 500
  return res.json({
    err
  })
}
