const {queryDB} = require('../utils/dbConn');


exports.addNotice = (data)=> {
  let query = "insert into notice set ?"
  return queryDB(query,data)
}


exports.getNotice = ()=>{
  let query = "select * from notice;"
  return queryDB(query)
}

exports.deleteNotice = (data)=>{
	let query = "DELETE FROM notice WHERE id=?"
	return queryDB(query,data.id)
}
