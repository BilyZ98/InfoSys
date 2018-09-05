const nodemailer = require('nodemailer')
const config = require("../config/config")
const mailModel = require('./mailModel')
const asynchronous = require('async')
const fs = require('fs')
const dirPath = '../uploads/'

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
  console.log('mails ---')
  console.log(mails)
    console.log('mails ---')
  let wrongMails = [] //save mails not exist
  let mailOptions = {
    from: '873421427 <873421427@qq.com>',
    to: '',
    html: fields['content'],
    attachments: []
  }
  var tmp = true
  for(let mail in mails){
    if(tmp){
      mailOptions.to+= mail
      tmp =false
    }
    else {
      mailOptions.to+=',' + mail
    }
  }
  console.log('mails to ---------')
console.log(mailOptions.to)
console.log('mails to --------')
  for(let i =0; i<fields.fileNum; i++){
    mailOptions.attachments.push({filename:files['file' + i.toString()]['name'],
                                  path:files['file' + i.toString()].path})


  }

  await transporter.sendMail(mailOptions,(err,info)=>{
    if(err){
      return console.log(err)
    }
    console.log("message sent:"  + info.response)
  });

}

/*

  asynchronous.each(mails,function(value,callback){
    let mailOptions = {
      from: '873421427<873421427@qq.com>',
      to: value,
      subject:fields['title'],
      html: fields['content'],
      attachments: []
    }
    for(let i =0; i<fields['fileNum'];i++){
      attachments.push({filename:files['file' + i.toString()]['name']
                                  })
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
*/
