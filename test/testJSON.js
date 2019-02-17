


var query =  {
  'select':['basicInfo', 'party'],
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

var newQuery =  {
	"select": [],
	"where": {
		"equal": {
			"basicInfo": {
				"gender": "男"
			}
		},
		"range": {
			"schoolRoll": {
				"timeInSchool": {
					"min": "123",
					"max": "321"
				}
			}
		},
		"fuzzy": {
      'basicInfo':{
        'name':'zzt'
      }
    }
	}
}

var newWhereObj = newQuery['where']
var newWhereArray = []

for(devide in newWhereObj){
  for(table in newWhereObj[devide]){
    newWhereArray.push(table)
  }
}
console.log(newWhereArray)

var t = {
  'a':{}
}

console.log(JSON.stringify(t['a']) )


console.log("------------")
let a = {
  "a":1,
  "b":2
}
a.c = 3
console.log(a)
let b ={
  a,
  "c":3
}
console.log(b)
console.log("----------------")


//'basicInfo.sid=paper.sid and paper.sid = party.sid'
//'basicInfo.sid = ? and basicInfo.name = ? '
/*
var myset = new Set();

var whereObj = query['where'];
var whereStr = '';
var whereValues =[];

var selectObj = query['select'];
for(table in selectObj){
  myset.add(selectObj[table]);
}
for(table in whereObj){
  myset.add(table)
}

var tmp = true;
myset.forEach((item, sameitem, s) =>{
  if(tmp === true){
    tmp = false;
    console.log('true')
  }
  else{
    //tmp = false;
    console.log('false');
  }
  console.log(item);
})

//console.log(myset);

for (table in whereObj) {
  for (field in whereObj[table]) {
    whereStr+= table + '.' + field + ',';
    whereValues.push(whereObj[table][field])
  }
}

whereStr = whereStr.substr(0,whereStr.length - 1);

//console.log(myset);

console.log(whereStr);
*/
