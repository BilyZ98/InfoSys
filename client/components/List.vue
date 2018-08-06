<template>
<div class="list-student">
  <div v-for="student in students">
    <h2>姓名：{{ student.name }} 学号：{{student.sid}}</h2>
    <div v-for="table in tableData">
      <h4>{{table.name}}</h4>
      <div v-for="record in table.records">
        <span v-if="student[record.id]!=undefined">{{record.name}}:{{student[table.id+'-'+record.id]}}</span>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import tableData from './tableData.js'

export default {
  data() {
    return {
      students: [],
      tableData: tableData
    }
  },
  created: function() {
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
    console.log(this.$route.params.postData)
    console.log(this.$route.params.recordFilter)
    var recordFilter = {
      "select": ["basicInfo", "schoolRoll", "cadre", "techProject"],
      "show": {
        "basicInfo": ["name", "birthDate", "tel"],
        "schoolRoll": ["class", "studyYears"],
        "cadre": ["cadreClass"],
        "techProject": ["proName", "employer", "money", "teacher"]
      }
    }

    var testData = [{
      "sid": "12345678",
      "name": "qqwe",
      "gender": "男",
      "birthPlace": "安徽",
      "ethnic": "阿昌族",
      "poliFace": "群众",
      "idNum": "440801199809292612",
      "birthDate": "1998-09-28T16:00:00.000Z",
      "tel": "15626278343",
      "mail": "873421427@qq.com",
      "wechat": "123214",
      "qq": "12312414",
      "degree": "本科",
      "stuGroup": "统招",
      "grade": "2012",
      "major": "123",
      "basicInfo_class": "1",
      "dorm": "至善园1号",
      "dormRoom": "123",
      "speciality": "123213",
      "highSchool": "12312"
    }]
    var studentFilter = this.iniFilter(recordFilter, testData)
    var a = 'basicInfo'
    var b = 'class'
    var c = a+'_'+b
    console.log(testData[0][c])
    this.students = testData
    //this.fetchData(this.$route.params.postData, this.$route.params.recordFilter)
  },
  methods: {
    iniFilter: function(recordFilter){
      var studentFilter = {}
      for(var i = 0; i < recordFilter['select'].length; i++){
        var tableName = recordFilter['select'][i]
        var tableFilter = recordFilter['show'][recordFilter['select'][i]]
        studentFilter[tableName] = {}
        for(var j=0; j < tableFilter.length; j++){
          studentFilter[tableName][tableFilter[j]] = 'nan!'
        }
      }
      return studentFilter
    },
    fetchData: function(dataJson, recordFilter) {
      //为了把this传进ajax
      var _self = this
      // replace getPost with your data fetching util / API wrapper
      $.ajax({
        type: 'POST',
        url: '/students/query',
        data: dataJson,
        contentType: 'application/json;charset=utf-8',
        dataType: 'json',
        timeout: 5000,
        success: function(data, xhr) {
          //_self.students = [{name:'zhangsan', sid:'123'}];
          console.log(xhr.status)
          console.log(data)
        },
        error: function(data) {
          console.log(data.status)
          alert(data.responseJSON.err)
        }
      })
    }
  }
}
</script>

<style>
.list-student {
  text-align: left;
  padding-left: 30px;
}
</style>
