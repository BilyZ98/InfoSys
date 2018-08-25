const _= require('lodash')


module.exports = {
  sendMessage(option){
    option = _.assign({
      name:'',
      fromName:'',
      message:''
    },option)
    let title = '[SDCS - 消息通知]'
    let content =
      `亲爱的${option.name}同学:<br/>
      <blockquote>
      您好！<br/><br/>
      消息内容 <big>${option.message}</big><br/><br/>
      </blockquote>
      <p align="right">${option.fromName}<br/>请勿回复</p>`
      return {title,content}
  }
}
