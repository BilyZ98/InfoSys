/*
这个模块用于向学生展示自己的信息
包括
1.展示个人的全部信息
2.查看公告

*/


const resBody = require('../utils/resBody.js');
var StudentsModel = require('../models/student-model.js');
var asynchronous = require('async');
//const mailer = require('../utils/mailer.js')
//var formidable = require('formidable')
//const path = require('path')
//var uploadDir = path.resolve(__dirname,'..')
//uploadDir = path.join(uploadDir,'/uploads')

/*
    得到一个人的所有信息，用了原来student-model 的queryAll
*/
exports.getSelfRecord = async(req,res,next) => {
    /*
        
    let query = "" ;
    let values = []
    for(let table in data['tables']){
      query+="select * from " + data['tables'][table] + ' where sid = ?; \n'//+ data['id']
      values.push(data['id'])
    }
    console.log(query)
    return queryDB(query,values);
    */
   StudentsModel.queryAll(req.body).then((data)=>{
    let content={}
    for(i in req.body['tables']){
      content[req.body['tables'][i]] = data[i]
    }
    console.log(content)
    resBody.success(res,content)
  }).catch((err)=> {
    resBody.error(res,err)
  })
}


