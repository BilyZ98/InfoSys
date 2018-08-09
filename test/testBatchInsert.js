
const stuModel = require('../models/student-model.js')


let query =  {
  'table':'basicInfo',
  'field':['sid','name','gender','birthPlace'],
  'batchInfo':[['16340320','zzt','male','zj'],
['12345679','asd','female','bj']]
}

for(one in query['batchInfo']){
  console.log(query['batchInfo'][one])
}

var a = [1,2,4]

function test(a){
  var b =a
  b[0] = 7
  a =[2,6,8]
}

test(a)
console.log(a)
/*
stuModel.batchInsert(query).then((data) => {
  console.log('success insert')
})
.catch((err)=>{
  console.log(err);
})
*/
