const nodemailer = require('nodemailer')
const config = require("../config/config")
const mailModel = require('./mailModel')

let transporter = nodemailer.createTransport(config.mailer_config)
/*

{
'mails':['873421427@qq.com','123@qq.com'],
'names':['fxxker','lover'],
'message':'love&peace',
'fromName':'qnh'
}

*/



exports.sendMail = async (data) =>{
  for(let i in data['mails']){
    let message = mailModel.sendMessage({name:data['names'][i], fromName:data['fromName'], message:data['message']})
    let mailOptions = {
      from: data['fromName'] + ' <873421427@qq.com>',
      to: data['mails'][i],
      subject: message.title,
      html:message.content
    }
    await transporter.sendMail(mailOptions,(err,info)=>{
      if(err){
        return console.log(err)
      }
      console.log("message sent:"  + info.response)
    });
  }
}
