const Promise = require('bluebird');
const {queryDB} = require('../utils/dbConn');
const resBody = require('../utils/resBody.js');


exports.addUser =  (data)=> {
  let query = "insert into user \n" +
  "(account,password) values (?,?);";
  let values = [data.account, data.password];
  return queryDB(query,values);
}

exports.checkUser = (data) =>{
  let query = "select * from user\n" +
  "where account = ?;"
  let values = [data.account];
  return queryDB(query,values);
}
