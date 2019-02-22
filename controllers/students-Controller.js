const resBody = require('../utils/resBody.js')
var StudentsModel = require('../models/student-model.js')
var asynchronous = require('async')
const mailer = require('../utils/mailer.js')
var formidable = require('formidable')
const path = require('path')
const fs = require('fs')
//import {promisify} from 'util'
const util = require('util')
const readFile = util.promisify(fs.readFile)
const archiver = require('archiver')

var uploadDir = path.resolve(__dirname,'..')
uploadDir = path.join(uploadDir, '/uploads')

var uploadDirForInterStu = path.resolve(__dirname,'..')
uploadDirForInterStu = path.join(uploadDirForInterStu,'/uploadsForInterStu')

//根据学生的id 进行查询
exports.getStudentsInfo = async (req,res,next) => {
  let data = await  StudentsModel.getStudentInfo(req.body);
  console.log(JSON.stringify(data));
  resBody.success(res, data);
}

//范式， 用于学生插入基本信息
async function template(req,res,next,concrete, table){
  let preCheck1 = await checkConflict(req.body, table);
  let preCheck2 = checkIDValid(req.body);

  if(preCheck1 && preCheck2)
  {
    //StudentsModel.addFamily(req.body)
    concrete(req.body).then(() => {
      resBody.success(res);
    })
    .catch((err) => {
      resBody.error(res,err);
    });
  }
  else
  {
      if(!preCheck1)
      {
        resBody.fail(res,441, 'conflict_check_fail');
      }
      else {
        resBody.fail(res,442,'validation_check_fail');
      }
  }
}

//写一个导入的函数
//批量插入
/*
* 查询格式 {
  'table':'basicInfo',
  'field':['sid','name','gender','birthPlace'],
  'batchInfo':[['16340320','zzt','male','zj'],
['12345679','asd','female','bj']]
}

*/
exports.batchInsertInfo = async (req,res,next) => {
  let body = req.body;
  console.log(body)
  let batchInfo = body['batchInfo']
  let errInfo = []
  let primary = StudentsModel.getTablePriKey(body['table'])
  var hasError = false
  for(let one in batchInfo){
    //将每条记录的学生转 为json 对象格式，用于checkConflict
    var json ={}
    for(let i in body['field']){
      json[body['field'][i]] = batchInfo[one][i]
    }
    //查找在数据库里是否存在相同键的记录，有就更新，没有就插入
    let preCheck = await checkConflict(json,body['table'])
    try{
      if(preCheck){
        await  StudentsModel.insertOne(body['table'],body['field'],batchInfo[one])
      }
      else {
        console.log('update')
        await  StudentsModel.updateOne(body['table'],body['field'],batchInfo[one])
      }
    }
    catch(err){
      hasError=true;
      console.log(err)
      let stuKey = {}
      for(let i in primary){
        stuKey[primary[i]] = json[primary[i]]
      }
      errInfo.push(stuKey)
    }
  }

  if(hasError) resBody.error(res,errInfo)
  else resBody.success(res)
}



//表示查询，传入json 格式见 testJson.js，用于多表连接
exports.query = async (req,res,next) => {
  console.log(req.body)
  StudentsModel.query(req.body).then((data)=>{
    console.log(data);
    resBody.success(res,data)
  })
  .catch((err)=>{
    resBody.error(res,err);
  })

}
//只查询一个表，用原来的方法就可以，可以增加一个检查，判断传过来的select 里面是不是只有一个表，
//如果不是，则报错
exports.queryOne = async (req,res,next) => {
  if(req.body['select'].length !=1) {
    resBody.fail(res,443,'only_support_one_table_query');
    return;
  }
  StudentsModel.query(req.body).then((data)=>{
    console.log(data);
    resBody.success(res,data)
  })
  .catch((err)=>{
    resBody.error(res,err);
  })
}

//点击学生学号，返回学生所有信息
exports.queryAll = async(req,res,next) => {
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


//数据库插入学生基本信息
exports.addBasicInfo = async (req,res,next) =>{
  let preCheck1 = await checkConflict(req.body,'basicInfo')
  let preCheck2 = checkValidation(req.body)

  if(preCheck1 && preCheck2)
  {
    StudentsModel.addBasicInfo(req.body).then(() => {
      resBody.success(res)
    })
    .catch((err) => {
      resBody.error(res,err)
    })
  }
  else
  {
    if(!preCheck1)
    {
      resBody.fail(res,441, 'conflict_check_fail');
    }
    else {
      resBody.fail(res,442,'validation_check_fail');
    }
  }
}

exports.addFamily =  async (req,res,next) =>{
 template(req,res,next,StudentsModel.addFamily, "family")
}


exports.addCadre = async (req,res,next) => {
  template(req,res,next,StudentsModel.addCadre,"cadre");
}

exports.addAward = async (req,res,next) => {
  template(req, res, next, StudentsModel.addAward, "award");
}

exports.addPaper = async (req,res,next) =>{
  template(req,res,next,StudentsModel.addPaper,"paper");
}


exports.addPatent = async (req,res,next) =>
{
  template(req,res,next,StudentsModel.addPatent, "patent");
}


exports.addTechProject = async (req,res,next) => {
  template(req,res,next, StudentsModel.addTechProject,"techProject");
}

exports.addHMT = async (req,res,next) => {
  template(req,res,next, StudentsModel.addHMT,"HMT")
}

//插入国际生要上传照片，一个人的签证照片可能有多张，新建一个表，以国际生的学号为外键。
exports.addInterStu = async (req, res, next) => {
  //template(req,res,next, StudentsModel.addInterStu,"internationalStudent")
  var hasError = false
  try {
    var form = new formidable.IncomingForm();
    form.multiples = true
    form.uploadDir = uploadDirForInterStu
    form.keepExtensions = true
    form.encoding = 'utf-8'

    let fileExt

    form.parse(req, async function(err, fields, files) {
      //let data = fields
      let data = {}
      data.sid = fields.sid
      //console.log('start to insert copys into db: ', data)
      //console.log(files.dormRegistryCopy)
      if(files.dormRegistryCopy){
        for(let i in files.dormRegistryCopy) {
          // 无法通过.length获取File数组的长度，只能hack判断若只有一个文件，会获取到第一个domain字段的方法
          if (i == 'domain') {
            // 一个文件
            if(!checkExtension(files.dormRegistryCopy.path)) {
              break
            }
            data.filePath = files.dormRegistryCopy.path
            console.log('insert into dormRegistryCopy: ', data)
            await StudentsModel.addDormRegistryCopy(data)
            break
          } else {
            // 多个文件
            if(!checkExtension(files.dormRegistryCopy[i].path)) {
              continue
            }
            data.filePath = files.dormRegistryCopy[i].path
            console.log('insert into dormRegistryCopy: ', data)
            await StudentsModel.addDormRegistryCopy(data)
          }
        }
      }
      if(files.visaCopy) {
        for(let i in files.visaCopy) {
          if (i == 'domain') {
              if(!checkExtension(files.visaCopy.path)){
              break
            }
            data.filePath = files.visaCopy.path
            console.log('insert into visaCopy: ', data)
            await StudentsModel.addVisaCopy(data)
            break
          } else {
            if(!checkExtension(files.visaCopy[i].path)){
              continue
            }
            data.filePath = files.visaCopy[i].path
            console.log('insert into visaCopy: ', data)
            await StudentsModel.addVisaCopy(data)
          }
        }
      }
      if(files.passportCopy) {
        for(let i in files.passportCopy) {
          if (i == 'domain') {
            if(!checkExtension(files.passportCopy.path)){
              break
            }
            data.filePath = files.passportCopy.path
            console.log('insert into passportCopy: ', data)
            await StudentsModel.addPassportCopy(data)
            break
          } else {
            if(!checkExtension(files.passportCopy[i].path)){
              continue
            }
            data.filePath = files.passportCopy[i].path
            console.log('insert into passportCopy: ', data)
            await StudentsModel.addPassportCopy(data)
          }
        }
      }
      data = fields
      console.log('inert into normal interStu db: ', data)
      await StudentsModel.addInterStu(data)
    })
  }
  catch(err) {
    hasError = true
    console.log(err)
    //resBody.error(res, err)
  }
  if (hasError) resBody.error(res)
  else resBody.success(res)
}
/*
检测文件类型是否为照片
*/
function checkExtension(filePath){
  var fileExt = filePath.substring(filePath.lastIndexOf('.'))
  if(('.jpg.jpeg.png.gif.pdf').indexOf(fileExt.toLowerCase()) === -1){
    console.log('file type illegal')
    return false
  }
  return true
}

/*
返回国籍学生的基本信息，包含上传的图片，对于一般查询，不用返回图片
查找数据库里，这个国际学生的对应的三个copy表的所有记录，存储在json
只返回照片，返回文字再次请求

*/
exports.getInterStudentPics = async (req, res, next) => {
  let copyTables = ['dormRegistryCopy', 'visaCopy', 'passportCopy']
  //console.log(req.query.sid)
  let tableId = req.query.tableId
  let sid = req.query.sid
  let returnData = {
    dormRegistryCopy: [],
    visaCopy: [],
    passportCopy: []
  }
  let err = null
  try {
    /*
    var ppp = ''
    for(let i in copyTables) {
      let copies = await StudentsModel.getFilePath(sid, copyTables[i])
      for(let j in copies) {
        console.log(copies[j].filePath)
        ppp = copies[0].filePath
        //[ err, tmpFile ] = await readFile(copies[j].filePath) //前面已经promisify了
        returnData[copyTables[i]][j] = await readFile(copies[j].filePath)
      }
    }
    */
    /* single file
    res.download(ppp, 'report.pdf', function(err){
      if (err) {
        // Handle error, but keep in mind the response may be partially-sent
        // so check res.headersSent
      } else {
        // decrement a download credit, etc.
      }
    })
    */
    var output = fs.createWriteStream(uploadDirForInterStu + '/' + sid + tableId + '.zip')
    var archive = archiver('zip', {
        gzip: true,
        zlib: { level: 9 } // Sets the compression level.
    })
    // listen for all archive data to be written
    // 'close' event is fired only when a file descriptor is involved
    output.on('close', function() {
      console.log('archiver has been finalized and the output file descriptor has closed.')
      res.download(uploadDirForInterStu + '/' + sid + tableId + '.zip')
    })
    archive.on('error', function(err) {
      throw err
    })
    // pipe archive data to the output file
    archive.pipe(output)
    // append files
    let copies = await StudentsModel.getFilePath(sid, tableId)
    for(let j in copies) {
      //console.log(copies[j].filePath)
      archive.file(copies[j].filePath)
    }
    // append files from a sub-directory, putting its contents at the root of archive
    //archive.directory('/haha', false)
    archive.finalize()
  }
  catch(err) {
    console.log(err)
    resBody.error(err)
  }
}

exports.statistic = async (req,res,next) => {
  StudentsModel.statistic(req.body).then((data)=>{
    console.log('statistic')
    console.log(data)
    resBody.success(res,data)
  }).catch((err)=>{
    resBody.error(res,err)
  })
}

exports.updateInfo = async (req,res,next)=>{
  StudentsModel.updateInfo(req.body).then((data)=>{
    console.log(data)
    resBody.success(res,data)
  })
  .catch((err)=>{
    console.log('error occurred')
    resBody.error(res,err)
  })
}

/**
data format
{
  'fields':{
    'title': 'test title',
    'content':'<p>123456</p >',
    'sid':['12345678','12345679'],
    'fileNum':5
  }
  'files': ...
}
*/
//发送邮件
exports.sendMail = async (req,res,next) =>{
  try{
    var form  = new formidable.IncomingForm();
    form.multiples = true
    form.uploadDir = uploadDir
    form.keepExtensions = true
    form.encoding = 'utf-8'
    console.log()
    form.parse(req,async function(err, fields, files){
      console.log(files);
      console.log(fields);
      StudentsModel.getMails(JSON.parse(fields['sid'])).then(async (mails)=>{
          await mailer.sendMail(mails,fields, files)
          resBody.success(res)
      })
      .catch((err)=>{
        console.log(err)
      })
    })
  }
  catch(err){
    resBody.error(res,err)
    console.log(err)
  }
}


exports.getFailedCourseReacord = async (req,res,next) => {
  let data = req.body;
  console.log(data);
  if(data.minYear > data.maxYear){
    resBody.fail(res,443,'时间段设置错误')
    return
  }
  if(data.minYear== data.maxYear){
    if(data.minSemester>data.maxSemester){
      resBody.fail(res,443,'时间段设置错误')
      return
    }
  }
  
  let failedCourses = await StudentsModel.getFailedCourse(req.body)
  console.log(failedCourses)
  resBody.success(res,failedCourses)
}

exports.getFailedStudents = async (req,res,next) => {
  /*let data = req.body;
  if(data.minYear > data.maxYear){
    resBody.fail(res,443,'时间段设置错误')
    return
  }
  if(data.minYear== data.maxYear){
    if(data.minSemester>data.maxSemester){
      resBody.fail(res,443,'时间段设置错误')
      return
    }
  }*/
  
  let failedStudents = await StudentsModel.getFailedStudents(req.body)
  console.log(failedStudents)
  resBody.success(res,failedStudents)
}


//检测数据库中是否已有记录
/**
* @checkConflict 检查某个学生在某个表中是否存在，需要主键
* @param data JSON 学生信息
* @param table string 要查询得表
  @return bool 是否存在这个学生记录， true表示没有矛盾
**/
async function checkConflict(body, table) {
  let check = await StudentsModel.checkStudent(body,table)
  return check.length === 0;
}


//检测格式是否正确
function checkValidation(body) {
  let id = new RegExp("^[0-9]{8}$");
  let idVali = id.test(body.sid);

  let tel = new RegExp("^[0-9]{11}$")
  let telVali = tel.test(body.tel)
  return idVali && telVali;
}

function checkIDValid(body) {
  let id = new RegExp("^[0-9]{8}$");
  let idVali = id.test(body.sid);

  return idVali;
}

/*
插入竞赛信息，包括三个表
*/
exports.addCompetition = async (req,res,next) =>{
  let data= req.body;
  //console.log(req.body)
  //resBody.fail(res,443,'时间段设置错误')
  try{
    await StudentsModel.addCompetition(data)
    for(let i in data.seniorsGroup){
      //console.log(data.seniorsGroup[i])
      await StudentsModel.addSeniorsGroup(data.seniorsGroup[i])
    }
    for(let i in data.teamMember){
      //console.log(data.teamMember[i])
      await StudentsModel.addTeamMember(data.teamMember[i])
    }
    resBody.success(res)
  }
  catch(err){
    console.log(err)
  }
}

exports.addWinners = async (req,res,next) => {
  //console.log(req.body)
  try{
    await StudentsModel.addWinners(req.body)
    resBody.success(res)
  }
  catch(err){
    console.log(err)
  }
}

exports.getWinners = async (req,res,next) => {
  //console.log(req.body)
  try{
    let result = await StudentsModel.getWinners(req.body)
    resBody.success(res,result)
  }
  catch(err){
    console.log(err)
  }
}

exports.getCompetition = async (req,res,next) => {
  //console.log(req.body)
  try{
    let result = await StudentsModel.getCompetition(req.body)
    resBody.success(res,result)
  }
  catch(err){
    console.log(err)
  }
}

exports.getCompetitionInfo = async(req,res,next) => {
  //comName leaderSid
  let competition = await StudentsModel.getCompetition(req.body)
  let seniorGroup = await StudentsModel.getSeniorGroup(req.body)
  let teamMember = await StudentsModel.getTeamMember(req.body)
  let comMeeting = await StudentsModel.getComMeeting(req.body)
  let data = {
    competition: competition,
    seniorGroup: seniorGroup,
    teamMember: teamMember,
    comMeeting: comMeeting
  }
  resBody.success(res,data)
}


