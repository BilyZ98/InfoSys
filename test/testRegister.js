var request = require('request')

/*
requestData = {
  'account':'16340320',
  'password':'123'
}
*/

info = {
  'sid':'12345678',
  'name':'asdwa',
  'tel':'15626278343',

}

data = {

}

request({
  url:'http://127.0.0.1:3000/users/createStudentsAccount',
  method:"POST",
  headers: {
     "content-type": "application/json"
  },
  body: JSON.stringify(data)//post参数字符串
}, function(err,res,body){
  if(!err ){
    console.log(body);
  }
  else {
    console.log(err);
  }
})
