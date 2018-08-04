

var stuModel = require('./models/student-model.js')


var query =  {
  'select':['basicInfo', 'partyInfo'],
  'where':{
    'basicInfo':{
      'sid':'16340320',
      'name':'asd'
    },
    'paper':{
      'sid':'16340320'
    }
  }

}

async function testQ(query){
  let data = await stuModel.query(query);
  console.log(data);
}

testQ(query);
