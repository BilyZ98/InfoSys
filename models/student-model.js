
const Promise = require('bluebird');
const {queryDB} = require('../utils/dbConn');

/*
exports.getStudentInfo = () =>{
  let query =
  "select * from family;"
  let values = [];
  return queryDB(query,values);
}
*/


function  getStudentInfo(callback) {
  let query =
  "select * from family;"
  let values = [];
  return queryDB(query,values);
}

/*
getStudentInfo().then(function(output){
  console.log('-----------------');
  console.log(output);
  console.log('-----------------');
});

*/
