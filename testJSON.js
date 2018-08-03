


var query =  {
  'select':{
    'basicInfo': ['tel', 'highSchool'],
    'party':['fuck','boynextdoor']
  },
  'where':{
    'basicInfo':{
      'sid':'16340320',
      'name':'asd'
    },
    'paper':{
      'sid':'16340320',
      'jj':'fuck'
    }
  }

}

var selectObj = query['where'];
var selectStr = '';
var selectValues =[];

for (table in selectObj) {
  for (field in selectObj[table]) {
    //console.log(selectObj[table][field]);
    selectStr+= table + '.' + field + ', ';
    selectValues.push(selectObj[table][field])
  }
}

//console.log(selectObj);

console.log(selectValues);
console.log(selectStr);

//console.log(query['where']['basicInfo'][0]);
//console.log(parseQuery);
