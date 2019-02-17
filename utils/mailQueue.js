const config = require('../config/config')
const Redis = require('redis')

/**
 * 邮件队列处理器
 * @param {(Object|Array)} pack 参数：邮件信息，传入为Object或Object的Array
 * @param {String} pack.to 或为pack[i].to，目标邮箱
 * @param {String} pack.title 或为pack[i].title，邮件标题
 * @param {String} pack.content 或为pack[i].content，邮件内容，为HTML文本的String
 */
exports.sendmail = (pack) => {
  if (!(pack instanceof Array)) {
    pack = [pack]
  }
  let mailpack = pack.map((value, index, array) => {
    value.times = 0
    return JSON.stringify(value)
  })
  for (let i = 0; i < mailpack.length; i++) {
    ((pack, i) => {
      let expireTime = i+1
      console.log(pack)
      console.log(expireTime)
      const client = Redis.createClient(config.redisConfig)
      client.set(pack, '1', 'EX', expireTime)
      client.quit()
    })(mailpack[i], i)
  }
}
