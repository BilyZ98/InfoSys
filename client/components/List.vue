<template>
<div class="container-card-list">

  <div class="table-row">
    <!--学号姓名标题-->
    <div class="table-col">
      <div class="table-head">学号姓名</div>
      <div class="table-reord-head"><p>学号</p></div>
      <div class="table-reord-head"><p>姓名</p></div>
    </div>

    <!--表格内容标题-->
    <div v-for="table in recordFilter.show" class="table-col">
      <div class="table-head">{{table.name}}</div>
      <div v-for="record in table.records" v-if="record.id!='sid'&&record.id!='name'" class="table-reord-head"><p>{{record.name}}</p></div>
    </div>
  </div>

  <!--学号姓名数据-->
  <div class="table-col">
    <div v-for="student in students" class="table-row">
      <div class="table-cell">
        <p>{{student[recordFilter['show'][0]['id']]['sid']}}</p>
      </div>
      <div class="table-cell">
        <p>{{student[recordFilter['show'][0]['id']]['name']}}</p>
      </div>
    </div>
  </div>

  <!--表格内容数据-->
  <div v-for="table in recordFilter.show" class="table-col">
    <div v-for="student in students" class="table-row">
      <div class="table-cell"  v-for="record in table.records" v-if="record.id!='sid'&&record.id!='name'">
        <p>{{student[table.id][record.id]}}</p>
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
      tableData: tableData,
      students: [],
      recordFilter: []
    }
  },
  created: function() {
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
    //console.log(this.$route.params.postData)
    //console.log(JSON.stringify(this.$route.params.recordFilter))
    /*
    var recordFilter = {
      "select": ["basicInfo", "cadre", "paper"],
      "show": [{
        "name": "基本信息",
        "id": "basicInfo",
        "records": [{ "name": "学号", "id": "sid" }, { "name": "性别", "id": "gender" }, { "name": "籍贯", "id": "birthPlace" }]
      }, {
        "name": "学生干部任职情况",
        "id": "cadre",
        "records": [{ "name": "学年", "id": "year" }, { "name": "职务类别", "id": "cadreClass" }, { "name": "职务名称", "id": "cadreName" }]
        }
      ]}
    var testData = [
      {basicInfo: {sid: 'id', name: 'name', gender: '男', birthPlace: '新疆'}, cadre: {year: '2013', cadreClass: 'homeAddress', cadreName: '321'}},
      {basicInfo: {sid: 'id1', name: 'name1', gender: '男1', birthPlace: '西藏'}, cadre: {year: '2013', cadreClass: 'homeAddress1289', cadreName: '321'}},
      {basicInfo: {sid: 'id', name: 'name', gender: '男', birthPlace: '新疆'}, cadre: {year: '2013', cadreClass: 'homeAddress', cadreName: '321'}},
      {basicInfo: {sid: 'id1', name: 'name1', gender: '男1', birthPlace: '西藏'}, cadre: {year: '2013', cadreClass: 'homeAddress1289', cadreName: '321'}},
      {basicInfo: {sid: 'id', name: 'name', gender: '男', birthPlace: '新疆'}, cadre: {year: '2013', cadreClass: 'homeAddress', cadreName: '321'}},
      {basicInfo: {sid: 'id1', name: 'name1', gender: '男1', birthPlace: '西藏'}, cadre: {year: '2013', cadreClass: 'homeAddress1289', cadreName: '321'}},
      {basicInfo: {sid: 'id', name: 'name', gender: '男', birthPlace: '新疆'}, cadre: {year: '2013', cadreClass: 'homeAddress', cadreName: '321'}},
      {basicInfo: {sid: 'id1', name: 'name1', gender: '男1', birthPlace: '西藏'}, cadre: {year: '2013', cadreClass: 'homeAddress1289', cadreName: '321'}},
      {basicInfo: {sid: 'id', name: 'name', gender: '男', birthPlace: '新疆'}, cadre: {year: '2013', cadreClass: 'homeAddress', cadreName: '321'}},
      {basicInfo: {sid: 'id1', name: 'name1', gender: '男1', birthPlace: '西藏'}, cadre: {year: '2013', cadreClass: 'homeAddress1289', cadreName: '321'}},
      {basicInfo: {sid: 'id', name: 'name', gender: '男', birthPlace: '新疆'}, cadre: {year: '2013', cadreClass: 'homeAddress', cadreName: '321'}},
      {basicInfo: {sid: 'id1', name: 'name1', gender: '男1', birthPlace: '西藏'}, cadre: {year: '2013', cadreClass: 'homeAddress1289', cadreName: '321'}},
      {basicInfo: {sid: 'id', name: 'name', gender: '男', birthPlace: '新疆'}, cadre: {year: '2013', cadreClass: 'homeAddress', cadreName: '321'}},
      {basicInfo: {sid: 'id1', name: 'name1', gender: '男1', birthPlace: '西藏'}, cadre: {year: '2013', cadreClass: 'homeAddress1289', cadreName: '321'}},
      {basicInfo: {sid: 'id', name: 'name', gender: '男', birthPlace: '新疆'}, cadre: {year: '2013', cadreClass: 'homeAddress', cadreName: '321'}},
      {basicInfo: {sid: 'id1', name: 'name1', gender: '男1', birthPlace: '西藏'}, cadre: {year: '2013', cadreClass: 'homeAddress1289', cadreName: '321'}},
      {basicInfo: {sid: 'id', name: 'name', gender: '男', birthPlace: '新疆'}, cadre: {year: '2013', cadreClass: 'homeAddress', cadreName: '321'}},
      {basicInfo: {sid: 'id1', name: 'name1', gender: '男1', birthPlace: '西藏'}, cadre: {year: '2013', cadreClass: 'homeAddress1289', cadreName: '321'}},
      {basicInfo: {sid: 'id', name: 'name', gender: '男', birthPlace: '新疆'}, cadre: {year: '2013', cadreClass: 'homeAddress', cadreName: '321'}},
      {basicInfo: {sid: 'id1', name: 'name1', gender: '男1', birthPlace: '西藏'}, cadre: {year: '2013', cadreClass: 'homeAddress1289', cadreName: '321'}}
    ]
    this.students = testData
    this.recordFilter = recordFilter
    */
    this.fetchData(this.$route.params.postData, this.$route.params.recordFilter)
  },
  methods: {
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
          _self.students = data.content
          _self.recordFilter = recordFilter
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
.container-card-list {
  display: table;
  margin: 2%;
  text-align: left;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 2%;
  background-color: white;
  /*radius*/
  border-radius: 3px;
  /*shadow*/
  box-shadow: -1px 1px 5px #888888;
}

.table-row {
  display: table-row;
}

.table-cell {
  display: table-cell;
  width: 120px;
  height: 20px;
  text-align: center;
  padding-top: 5px;
}

.table-cell:hover {
  background-color: grey;
}

.table-head {
  text-align: center;
}

.table-reord-head {
  display: table-cell;
  width: 120px;
  height: 20px;
  overflow: hidden;
  text-align: center;
  padding-top: 5px;
}

.table-col {
  float: left;
}
</style>
