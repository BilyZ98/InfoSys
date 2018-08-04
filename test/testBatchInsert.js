
const stuModel = require('../models/student-model.js')


let query =  {
  'table':'basicInfo',
  'field':['sid','name','gender','birthPlace'],
  'batchInfo':[['16340320','zzt','male','zj'],
['12345679','asd','female','bj']]
}

stuModel.batchInsert(query).then((data) => {
  console.log('success insert')
})
.catch((err)=>{
  console.log(err);
})
