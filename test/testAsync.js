var asynchronous = require('async')

var batchInfo=[['16340320','zzt','male','zj'],
['12345679','asd','female','bj']]


asynchronous.forEachOf(batchInfo,function(value,key,callback){
  console.log(value)
},function(err){
  console.log(err)
})
