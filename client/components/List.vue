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

  <hr>
  <button id="button-download" @click="downloadClick">导出Excel</button>
</div>
</template>

<script>
import tableData from './tableData.js'

export default {
  data: function() {
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

    //this.fetchData(this.$route.params.postData, this.$route.params.recordFilter)
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
    },
    //导出函数
    downloadClick: function() {
      //alert(this.getExplorer());
      if(this.getExplorer() == undefined)
      {
        //var curTbl = document.getElementById("content");
        console.log('ie!')
        var curTbl = this.students
        var oXL = new ActiveXObject("Excel.Application");
        var oWB = oXL.Workbooks.Add();
        var xlsheet = oWB.Worksheets(1);
        var sel = document.body.createTextRange();
        sel.moveToElementText(curTbl);
        sel.select;
        sel.execCommand("Copy");
        xlsheet.Paste();
        oXL.Visible = true;

        try {
          alert("ie");
          var fname = oXL.Application.GetSaveAsFilename("Excel.xls", "Excel Spreadsheets (*.xls), *.xls");
        } catch (e) {
          print("Nested catch caught " + e);
        } finally {
          oWB.SaveAs(fname);
          oWB.Close(savechanges = false);
          oXL.Quit();
          oXL = null;
          idTmr = window.setInterval("Cleanup();", 1);
        }
      }
      else
      {
        //这里用的是getTableContent，也可以改成getJsonContent
        //var str = this.getTableContent("content");
        var str = this.getJsonContent(this.students);
        let uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(str);
          //通过创建a标签实现
        var link = document.createElement("a");
        link.href = uri;
          //对下载的文件命名，可以改成其他名字
        link.download = "数据表.csv";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    },
    getTableContent: function(id){
      var mytable = document.getElementById(id);
      var data = [];
      var str = "";
      for(var i=0,rows=mytable.rows.length; i<rows; i++){
        for(var j=0,cells=mytable.rows[i].cells.length; j<cells; j++){
          /*if(!data[i]){
            data[i] = new Array();
          }
          data[i][j] = mytable.rows[i].cells[j].innerHTML;*/
          if( j==0 ) str+=mytable.rows[i].cells[j].innerHTML;
          else
          {
            str+=",";
            str+=mytable.rows[i].cells[j].innerHTML;
          }
        }
        str += '\n';
      }
      //return data;
      return str;
    },
    //给出保存json的全局变量然后导出，格式：[{},{},{}]
    getJsonContent: function(jsonData){
      //console.log(tableData.length)
      var str = ''
      //表名部分
      for(let item in jsonData[0]){
        //id转换name，先找到表
        let table = {}
        for(let i = 0; i < tableData.length; i++){
          if(item == tableData[i].id){
            table = tableData[i]
            break
          }
        }
        str += table['name']
        for(let record in jsonData[0][item]){
          for(let j = 0; j < table['records'].length-1; j++){
            if(table['records'][j].id == record){
              str += ','
            }
          }
        }
      }
      str += '\n'
      //字段名部分
      for(let item in jsonData[0]){
        //id转换name，先找到表
        let table = {}
        for(let i = 0; i < tableData.length; i++){
          if(item == tableData[i].id){
            table = tableData[i]
            break
          }
        }
        for(let record in jsonData[0][item]){
          for(let j = 0; j < table['records'].length; j++){
            if(table['records'][j].id == record){
              str += table['records'][j].name
              str += ','
            }
          }
        }
      }
      str += '\n'
      //数据部分
      for(let i = 0; i < jsonData.length; i++ ){
        for(let item in jsonData[i]){
          for(let record in jsonData[i][item]){
            str += jsonData[i][item][record]
            str += ','
          }
        }
        str += '\n'
      }
      return str
    },
    getExplorer: function() {
      var explorer = window.navigator.userAgent;
      //ie
      if (explorer.indexOf("MSIE") >= 0) {
        return 'ie'
      }
      //firefox
      else if (explorer.indexOf("Firefox") >= 0) {
        return 'Firefox'
      }
      //Chrome
      else if(explorer.indexOf("Chrome") >= 0){
        return 'Chrome'
      }
      //Opera
      else if(explorer.indexOf("Opera") >= 0){
        return 'Opera'
      }
      //Safari
      else if(explorer.indexOf("Safari") >= 0){
        return 'Safari'
      }
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

hr, #button-download {
  clear: both;
}
</style>
