var asynchronous = require('async')

var batchInfo=[['16340320','zzt','male','zj'],
['12345679','asd','female','bj']]


asynchronous.each(batchInfo,function(value,callback){
  console.log(value)
  console.log(key)
},function(err){
  console.log(err)
})
