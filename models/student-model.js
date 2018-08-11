
const Promise = require('bluebird');
const {queryDB} = require('../utils/dbConn');
const resBody = require('../utils/resBody.js');


exports.getStudentInfo = async (data)=> {
  let query =
  "select * from students where students.sid = ?\n;"
  let values = [data.sid];
  //console.log(data.sid);
  return queryDB(query,values);
}

//批量插入
/*
* 查询格式 {
  'table':'basicInfo',
  'field':['sid','name','gender','birthPlace'],
  'batchInfo':[['16340320','zzt','male','zj'],
['12345679','asd','female','bj']]
}
*
*
*/
exports.batchInsert = (table,field,oneRecord) => {
  var tmp = true;
  //var field = data['field'];
  let query =
  "insert into " + table +
  "  ( ";
  for(x in field){
    if(tmp) {
        query +=field[x];
        tmp =false;
    }
    else {
      query+=',' + field[x];
    }
  }
  query+=' ) values ?';
  console.log(query)
  let values = oneRecord;
  return queryDB(query, [values]);
}

//只负责插入，由控制层负责检查是否已经在数据库里面，然后选择更新或者插入
//oneRecord表示 插入信息数组的每一个子数组
//测试数据在testBatchInsert.js
exports.insertOne = (table,field, oneRecord) =>{
  var tmp = true;
  //var field = data['field']
  let query =
  "insert into " + table +
  " ( ";
  for(x in field){
    if(tmp){
      query+=field[x]
      tmp =false
    }
    else {
      query+=',' + field[x]
    }
  }
  query+=' ) values (';
  tmp = true;
  for(x in field){
    if(tmp){
      query+='?'
      tmp =false
    }
    else {
      query+=',?'
    }
  }
  query+=')? ;'
  console.log(query)
  let values = oneRecord

  return queryDB(query,values);
}

//现在的更新是只针对sid一个键连接，还没有考虑到一个表有多个键的情况
exports.updateOne = (table,field, oneRecord) => {
  var tmp = true;
  //var field = data['field']
  var sid = oneRecord[0] //表示sid，先把sid移除
  oneRecord.splice(0,1)
  let query =
  "update " + table +
  " set  ";
  for(x in field){
    if(field[x]!='sid'){
      if(tmp){
        query+=field[x] + ' =? '
        tmp =false
      }
      else {
        query+=',' + field[x] + '=? '
      }
    }

  }
  query+=' where sid = ? ;'
  console.log(query)
  oneRecord.push(sid)
  let values = oneRecord
  return queryDB(query,values);
}


exports.addBasicInfo = (data) =>{
  let query =
  "insert into basicInfo \n" +
  "(sid, name, gender, birthPlace, ethnic, \n" +
   "poliFace, idNum, birthDate, tel, mail, \n" +
   "wechat, qq, degree, stuGroup, grade, major, \n" +
   "class, dorm, dormRoom, speciality, highSchool) \n" +
   "values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);"
   let values = [data.sid, data.name, data.gender, data.birthPlace,  data.ethnic,
      data.poliFace,  data.idNum,  data.birthDate,  data.tel,  data.mail,
     data.wechat,  data.qq,  data.degree,  data.stuGroup,  data.grade,  data.major,
   data.class,  data.dorm,  data.dormRoom,  data.speciality,  data.highSchool];
   return queryDB(query,values);
}

exports.addFamily = (data) => {
  let query =
  "insert into family \n" +
  "(sid, name, homeAddress, fatherName, fatherTel,\n " +
  "fatherJob, motherName, motherTel, motherJob \n" +
  ") values (?, ?, ?, ?, ?, ?, ?, ?, ?);"
  let values = [data.sid, data.name, data.homeAddress, data.fatherName,
    data.fatherTel, data.fatherJob, data.motherName, data.motherTel, data.motherJob]
  return queryDB(query,values);
}


exports.addCadre = (data) => {
  let query =
  "insert into cadre \n" +
  "(sid, name, year, cadreClass, cadreName, cadreJiBie) \n" +
  " values (?, ?, ?, ?, ?, ?)";
  let values = [data.sid, data.name, data.year, data.cadreClass, data.cadreName, data.cadreJiBie]
  return queryDB(query,values);
}
exports.addAward = (data) => {
  let query =
  "insert into award \n" +
  "(sid, name, stuClass, awardName, awardClass, employer, \n "+
  "awardJiBie, awardYearMonth， teacher)\n" +
  "values (?, ?, ?, ?, ?, ?, ?, ?, ?)";
  let values = [sid, name, stuClass, awardName, awardClass,
     employer,awardJiBie, awardYearMonth, teacher];
  return queryDB(query,values);
}

exports.addPaper = (data) => {
  let query =
  "insert into paper \n" +
  "(sid, name, title, authors, journal, serialNumber, pagesRange, paperGrade,\n"+
  "paperClass, time, insTeacher) values \n "+
  "(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  let values= [data.sid, data.name, data.title, data.authors, data.journal, data.serialNumber, data.pagesRange, data.paperGrade,
  data.paperClass, data.time, data.insTeacher]
  return queryDB(query,values);
}

exports.addPatent = (data) => {
  console.log(data);
  let query =
  "insert into patent \n"+
  "(sid, name, patentName, class, submitTime, approvalTime, patentRange,\n"+
  "unit, patentNumber, creators) values \n"+
  "(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  let values =[data.sid, data.name, data.patentName, data.class, data.submitTime, data.approvalTime, data.patentRange,
  data.unit, data.patentNumber, data.creators]
  return queryDB(query,values);
}

exports.addTechProject = (data) => {
  let query =
  "insert into techProject \n" +
  "(sid, name, proName, employer, money, proId, class, teacher, proTime)\n"+
  "values (?, ?, ?, ?, ?, ?, ?, ?, ?)";
  let values= [data.sid, data.name, data.proName, data.employer, data.money, data.proId, data.class, data.teacher, data.proTime]
  return queryDB(query,values);
}

//data 就是传过来的json数据
exports.query = (data) => {
  let query = "select ";

  var selectObj = data['select'];

  var whereObj = data['where'];
  var whereStr = '';
  var whereValues =[];

  var fromSet = new Set(); //对from 语句整合
  /*
  for(table in whereObj){
    fromSet.add(table)
  }
  */
  //迭代---> 支持等值，模糊，范围查询，所以要从三个子json里面拿表
  for(devide in whereObj){
    for(table in whereObj[devide]){
      fromSet.add(table)
    }
  }
  for(table in selectObj){
    fromSet.add(selectObj[table]);
  }


  for(table in selectObj){

    query+=selectObj[table] + '.*,';
  }
  query = query.substr(0,query.length -1 ); //选择了表，接下来要 from 哪些表

  query+= ' from ';

  var tmp = true; //用于连接字符串，看要不要加 ‘，’
  //将select  和where 的表集合连接
  fromSet.forEach((item, sameItem, s)=>{
    if(tmp){
      tmp = false;
      query+=item;
    }
    else{
      query+= ',' + item
    }

  })

  query+=' where ';

  var beforeTable = '';
  tmp =true; //表示 and 的第一次
  fromSet.forEach((item, sameItem, s) => {
    if(beforeTable == ''){
      beforeTable = item;
    }
    else{
      if(tmp){
          query+=beforeTable + '.sid = ' + item+ '.sid '
          tmp =false;
      }
      else {
          query+= ' and ' + beforeTable + '.sid = ' + item+ '.sid '
      }
      beforeTable = item;
    }
  })
if(!tmp) {
  query += ' and ';
}  //这个是针对多个sid,如果只有sid ，则不用加and

tmp = true;
//从前端传过来的输入的条件
//迭代---> 由于要支持模糊查询，范围查询等，因此数据会变化
for(devide in whereObj){
  for (table in whereObj[devide]) {
    for (field in whereObj[devide][table]) {
      if(tmp){
        switch(devide){
          case "equal":
            whereStr+= table + '.' + field + ' = ?  ';
            break;
          case "range":
            whereStr += table+'.' + field + ' between ? and ? ' ;
            break;
          case "fuzzy":
            whereStr += table+'.'+field + ' like %?% ';
            break;
        }

        tmp =false;
      }
      else {
        switch(devide){
          case "equal":
            whereStr+= ' and ' + table + '.' + field + ' = ?  ';
            break;
          case "range":
            whereStr += ' and ' + table+'.' + field + ' between ? and ? ' ;
            break;
          case "fuzzy":
            whereStr += ' and ' + table+'.'+field + ' like %?% ';
            break;
        }
        //whereStr+=' and ' + table + '.' + field + '= ? ';
      }

      switch(devide){
        case 'equal':
        case 'fuzzy':
          whereValues.push(whereObj[devide][table][field]);
          break;
        case 'range':
          whereValues.push(whereObj[devide][table][field]['min'],whereObj[devide][table][field]['max'])

      }
      //whereValues.push(whereObj[devide][table][field])
    }
  }
}


query+=whereStr;
query+=' \n;'
console.log(query);
let values= whereValues;
console.log(values);

return queryDB({sql:query,nestTables:true},values);
}

exports.checkStudent = (data, table) =>{
  let query = "select sid from " + table +" where sid = ? \n;"; //注意有空格
  let values = [data.sid]
  return queryDB(query,values);
}
/*
//下面测试将返回的结果转为json格式
getStudentInfo().then(function(output){
  console.log(JSON.stringify(output));
})
*/
