

var stuModel = require('../models/student-model.js')
var stuController = require('../controllers/students-Controller.js')


var query =  {
  'select':['paper' ],
  'where':{
    'paper':{
        'sid':'12345678'
    }

  }

}


async function testQ(query){
  let data = await stuController.query(query);
  console.log(data);
}

//testQ(query);

var out = {
  'basicInfo-sid':'1234',
  'sid':'1254'
}

var a = 'basicInfo'
var b = 'sid'
var c = a+ '-' +'sid';

console.log(c)
console.log(out[a+'-'+b])

console.log(out);
