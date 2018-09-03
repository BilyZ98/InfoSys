const mailer  = require('../utils/mailer')

let data = {
'mails':['873421427@qq.com'],
'names':['fxxker'],
'message':'love&peace',
'fromName':'qnh'
}

mailer.sendMail(data)
