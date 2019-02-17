const Promise = require('bluebird');
const {queryDB} = require('../utils/dbConn');
const resBody = require('../utils/resBody.js');


exports.addUser =  (data)=> {
  let query = "insert into user \n" +
  "(account,password) values (?,?);";
  let values = [data.account, data.password];
  return queryDB(query,values);
}

exports.addStudentAccount = (data) => {
  let query = "insert into studentAccount \n"+
              "(account,password) values (?,?);";
  let values = [data.account, data.password];
  return queryDB(query,values);
}

/*
  用于检查注册时账号，手机号，邮箱号手机否重复
*/
exports.checkUser = async (data) =>{
  let query = "select * from user\n" +
  "where account = ?;"
  let values = [data.account];
  return queryDB(query,values);
}
/*
  用账号检查用户列表是否重复
*/
exports.getUser = async (data) => {
  let query = "select * from user where account = ?";
  return queryDB(query,[data.account])
}

/*
得到学生账户记录
*/

/*
exports.getStudentAccount = async (data)=>{
  let query = "select * from studentAccount where account = ?"
  return queryDB(query,[data.account])
}
*/

exports.checkStudentAccount =async (sid) => {
  let query = "select * from studentAccount where account = ?";
  return queryDB(query,[sid]);
}

