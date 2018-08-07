<template>
<div>
  <div class="tableContainer">
    <div class="tableRow">
      <div v-for="table in recordFilter.show" class="tableCol">
        <div tableHead>{{table.name}}</div>
        <div v-for="record in table.records" class="tableReordHead"><p>{{record.name}}</p></div>
      </div>
    </div>

    <div v-for="table in recordFilter.show" class="tableCol">
      <div v-for="student in students" class="tableRow">
        <div class="tableCell"  v-for="record in table.records" v-if="student[table.id][record.id]!=undefined">
          <p>{{student[table.id][record.id]}}</p>
        </div>
      </div>
    </div>
  </div>

  <hr>
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
      }]
    }

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
    this.fetchData(this.$route.params.postData, this.$route.params.recordFilter)
  },
  methods: {
    fetchData: function(dataJson, recordFilter) {
          /*
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
      */
    }
  }
}
</script>

<style>
.tableContainer {
  display: table;
  margin: 20px;
  border: 1px solid grey;
  width: 5000px;
}

.tableRow {
  display: table-row;
}

.tableCell {
  display: table-cell;
  width: 120px;
  height: 20px;
  text-align: center;
  padding-top: 5px;
}

.tableCell:hover {
  background-color: grey;
}

.tableHead {
  background-color: grey;
}

.tableReordHead {
  display: table-cell;
  width: 120px;
  height: 20px;
  overflow: hidden;
  text-align: center;
  padding-top: 5px;
}

.tableCol {
  float: left;
}
</style>
