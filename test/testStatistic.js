
const model = require('../models/student-model.js')

var data = {
  'table':'basicInfo',
  'fields':['gender','major'],
  'condition':{
    //'grade':'2016'
  },

}

async function testSta(data){
  let out = await model.statistic(data);
  console.log(out);
}

testSta(data)

//console.log(data['bake'].toString());
//if(JSON.stringify(data['bake']) == '{}' ) console.log('fuck ass')

//单人所有表的信息改
let upInfo = {
  'basicInfo':{
    'primary':{
      'sid':'12345687',
    },
    'new':{
      'sid':'16340320',
      'name':"fuckass"
    }
  },
  'family':{
    'primary':{
      'sid':'24543543'
    },
    'new':{
      'sid':'16340320'
    }
  }
}

async function testUpdateInfo(data){
  let out = await model.updateInfo(data)
  console.log(out)
}

//testUpdateInfo(upInfo);
async function t(table){
    let back = await model.getTablePriKey(table);
    console.log(back)
}

//t('techProject')

let arr = ['fuck','shit','ass']
console.log(arr.indexOf('fuck'));
