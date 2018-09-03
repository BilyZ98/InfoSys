const nodemailer = require('nodemailer')
const config = require("../config/config")
const mailModel = require('./mailModel')
const asynchronous = require('async')

let transporter = nodemailer.createTransport(config.mailer_config)
/*

{
'mails':['873421427@qq.com','123@qq.com'],
'sid':['f','lover'],
'message':'love&peace',
'fromName':'qnh'
}


data format
{
  'fields':{
    'title': 'test title',
    'content':'<p>123456</p >',
    'sid':['12345678','12345679'],
    'fileNum':5
  }
  'files': {
  'file0':{
  'name':
},

}
}
*/


exports.sendMail = async (mails, fields, files) =>{
  let wrongMails = [] //save mails not exist
  asynchronous.each(mails,function(value,callback){
    let mailOptions = {
      from: '873421427<873421427@qq.com>',
      to: value,
      subject:fields['title'],
      html: fields['content'],
      attachments: []
    }
    for(let i =0; i<fields['fileNum'];i++){
      attachments.push({filename:files['file' + i.toString()]['1']})
    }
  },function(err){

  })
  for(let i in data['mails']){
    let message = mailModel.sendMessage({name:data['names'][i], fromName:data['fromName'], message:data['message']})
    let mailOptions = {
      from: ' 873421427<873421427@qq.com>',
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
