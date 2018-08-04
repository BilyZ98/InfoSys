

//数组里面的单个json ，批量插入的话，用数组将json 存起来
/*
let query = {
  'sid':'16340320',
  'name':'zzt',
  'gender':'male',
  'birthPlace':'zj'
}
*/


let query =  {
  'table':'basicInfo',
  'field':['sid','name','gender','birthPlace'],
  'batchInfo':[['16340320','zzt','male','zj'],
['12345678','asd','female','bj']]
}


let a = ['qwe',
'asd'];

console.log(a);
