
var mysql = require('mysql');
// The most popular mysql module
var Promise = require("bluebird");
// Note that the library's classes are not properties of the main export
// so we require and promisifyAll them manually
Promise.promisifyAll(require("mysql/lib/Connection").prototype);
Promise.promisifyAll(require("mysql/lib/Pool").prototype);

/*
var connection = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'qq3739225',
  database: 'zzt_db'
});
*/
var pool = mysql.createPool({
  connectionLimit:10,
  host:'172.18.178.112',
  user:'sdcs',
  password:'sysu_sdcs_123',
  database:'InfoSys',
  port:'3307',
  multipleStatements: true,
  dateStrings: true //use this for return bejing time
})

const getConnection = ()=> {
  return pool.getConnectionAsync().disposer(connection =>{
      connection.release();
  });
}

exports.queryDB = (sql,values) =>{
  return Promise.using(getConnection(),connection => {
    return connection.queryAsync(sql,values);
  });
}
exports.pool = pool;
