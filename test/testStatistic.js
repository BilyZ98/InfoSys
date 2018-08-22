
const model = require('../models/student-model.js')

var data = {
  'table':'basicInfo',
  'fields':['gender','major'],
  'condition':{
    'grade':'2016'
  },

}

async function testSta(data){
  let out = await model.statistic(data)
  console.log(out)
}

testSta(data)

//console.log(data['bake'].toString());
//if(JSON.stringify(data['bake']) == '{}' ) console.log('fuck ass')
