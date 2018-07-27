
const Promise = require('bluebird');
const {queryDB} = require('../utils/dbConn');
const resBody = require('../utils/resBody.js');
/*
exports.getStudentInfo = () =>{
  let query =
  "select * from family;"
  let values = [];
  return queryDB(query,values);
}
*/

res = {};

exports.getStudentInfo = async ()=> {
  let query =
  "select * from studentInfo;"
  let values = [];
  return queryDB(query,values);
}

/*
//下面测试将返回的结果转为json格式
getStudentInfo().then(function(output){
  console.log(JSON.stringify(output));
})
*/



/*
getStudentInfo().then(function(output){
  console.log('-----------------');
  console.log(output);
  console.log('-----------------');
});

*/
