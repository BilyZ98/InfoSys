var request = require('request')


requestData = {
  'account':'16340320',
  'password':'123'
}

request({
  url:'http://127.0.0.1:3000/users/register',
  method:"POST",
  headers: {
     "content-type": "application/json"
  },
  body: JSON.stringify(requestData)//post参数字符串
}, function(err,res,body){
  if(!err ){
    console.log(body);
  }
  else {
    console.log(err);
  }
})
