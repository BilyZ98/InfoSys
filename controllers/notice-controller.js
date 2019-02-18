const resBody = require('../utils/resBody.js');
const noticeModel = require('../models/notice-model.js');
const moment = require('moment')
/*
data format
{
  "title": "title of the text",
  "content": "this is the content of the text"
  /*,
  "createTime": "2018-09-06",
  "expireTime": "2020-09-06"

}
*/
exports.addNotice = (req,res,next) =>{
  let user = req.body
  user.account = req.session.user.account
  user.createTime = moment().format('YYYY-MM-DD')
  user.expireTime = moment().add(2,'year').format('YYYY-MM-DD')  //公告有效时间2年
  noticeModel.addNotice(user)
    .then(()=>{
      resBody.success(res,'发布公告成功')
    })
    .catch((err)=>{
      console.log(err)
      resBody.error(res,"发布失败")
    })
}

exports.getNotice = (req, res, next) => {
  noticeModel.getNotice().then((data)=>{
    resBody.success(res,data)
  })
  .catch((err)=>{
    resBody.error(res,err)
  })
}

exports.deleteNotice = (req,res,next) => {
  //console.log("????")
  noticeModel.deleteNotice(req.body)
    .then(()=>{
      resBody.success(res,'删除公告成功')
    })
    .catch((err)=>{
      console.log(err)
      resBody.error(res,"删除失败")
    })
}
