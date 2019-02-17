<template>
  <div id="manager-cadre">
    <!--顶部菜单-->
    <div class="container-header">
      <p class="header-text">学生干部任职情况管理</p>
      <div class="header-button">
        <span @click="insertClick">插入数据</span>
        <span @click="downloadClick">导出</span>
        <span @click="importClick">导入<input id="button-import" v-on:change="importUpload" type="file"></span>
        <span @click="mubanDownload">下载模板</span>
        <span>转毕业生</span>
        <span @click="diycolClick">自定义列</span>
        <span @click="sendEmailClick">邮件通知</span>
      </div>
    </div>
    <!--查询输入-->
    <div class="container-card-list">
      <div class="container-record" v-for="record in table.records">
        <span>{{record.name}}:</span>
        <input type="text" class="hide-container" v-if="record.valueType=='input'" v-bind:id="'cadre-'+record.id">
        <select class="hide-container" v-if="record.valueType=='select'" v-bind:id="'cadre-'+record.id">
          <option></option>
          <option v-for="option in record.options">{{option}}</option>
        </select>
        <span class="hide-container" v-if="record.valueType=='range'" v-bind:id="'cadre-'+record.id">
        <h6>最小值：</h6><input type="text" class="min"><h6> 最大值：</h6><input type="text" class="max">
      </span>
      </div>
      <button class="manager-button" @click="queryClick">查询</button>
    </div>
    <!--显示数据-->
    <div class="container-card-list">
      <table border="1">
        <tr class="table-head">
          <th>#</th>
          <th v-for="record in table.records" v-if="record['display']==true">{{record.name}}</th>
        </tr>
        <tr v-for="(student, index) in students" @click="studentClick" v-bind:sid="student['cadre']['sid']">
          <td>{{index+1}}</td>
          <td v-for="record in table.records" v-if="record['display']==true" contenteditable="false">
            <span v-if="student['cadre'][record.id]!=undefined">{{student['cadre'][record.id]}}</span>
            <span v-else>---</span>
          </td>
        </tr>
      </table>
    </div>
    <!--统计-->
    <div class="container-card-list">
      <div class="stat-record" v-for="record in table.records">
        <span>{{record.name}}:</span>
        <input class="stat-checkbox" type="checkbox" v-bind:record-id="record.id">
        <select class="hide-container" v-if="record.valueType=='select'" v-bind:id="'cadre-stat-'+record.id">
          <option></option>
          <option v-for="option in record.options">{{option}}</option>
        </select>
        <input class="hide-container" type="text" v-else v-bind:id="'cadre-stat-'+record.id">
      </div>
      <button class="manager-button" @click="statClick">统计</button>
      <span id="stat-chart-bar"></span>
      <span id="stat-chart-pie"></span>
    </div>
    <!-- 弹窗 -->
    <div id="popup" class="popup-background">
      <!-- 弹窗内容 -->
      <div class="popup-content">
        <span id="popup-close" @click="modalCloseClick">&times;</span>
        <div class="popup-cell" v-for="record in table.records">
          {{record.name}}
          <input type="checkbox" v-model:checked="record.display">
        </div>
      </div>
    </div>
    <!-- 发邮件 -->
    <div id="popup-email" class="popup-background">
      <email :emailSid="emailSid"></email>
    </div>
  </div>
</template>
<script>
import tableData from '../javascripts/tableData.js'
import formatCheck from '../javascripts/formatCheck.js'
import downloadModule from '../javascripts/downloadModule.js'
import importModule from '../javascripts/importModule.js'
import statModule from '../javascripts/statisticModule.js'
var empty = JSON.stringify({ equal: {}, range: {}, fuzzy: {} })
var emptyCell = JSON.stringify({})

export default {
  data: function() {
    return {
      table: tableData['cadre'],
      students: [],
      emailSid: []
    }
  },
  created: function() {
    //alert(window.innerWidth)
    //1536*728
  },
  methods: {
    insertClick: function() {
      this.$router.push({
        name: 'cadreInsert'
      })
    },
    queryClick: function() {
      var cadre = { equal: {}, range: {}, fuzzy: {} }
      var data = {
        select: ['cadre'],
        where: {
          equal: {},
          range: {},
          fuzzy: {}
        }
      }
      if ($('#cadre-sid').val()) {
        var sid = $('#cadre-sid').val()
        if (!formatCheck['cadre']['sid']['reg'].test(sid)) {
          alert(formatCheck['cadre']['sid']['msg'])
          return
        } else {
          cadre['equal']['sid'] = sid
        }
      } else {
        //验证格式
        var message = ''
        for (let item in formatCheck['cadre']) {
          if (formatCheck['cadre'][item]['reg'] != null) {
            let record = $('#cadre-' + item).val()
            if (record != '' && !formatCheck['cadre'][item]['reg'].test(record)) {
              message = message + formatCheck['cadre'][item]['msg']
            }
          }
        }
        if (message != '') {
          alert(message)
          return
        }
        if ($('#cadre-name').val()) cadre['equal']['name'] = $('#cadre-name').val()
        if ($('#cadre-year').val()) cadre['equal']['year'] = $('#cadre-year').val()
        if ($('#cadre-cadreClass').val()) cadre['equal']['cadreClass'] = $('#cadre-cadreClass').val()
        if ($('#cadre-cadreName').val()) cadre['equal']['cadreName'] = $('#cadre-cadreName').val()
        if ($('#cadre-cadreJiBie').val()) cadre['equal']['cadreJiBie'] = $('#cadre-cadreJiBie').val()
      }
      if (JSON.stringify(cadre['equal']) != emptyCell) data['where']['equal']['cadre'] = cadre['equal']
      if (JSON.stringify(cadre['range']) != emptyCell) data['where']['range']['cadre'] = cadre['range']
      if (JSON.stringify(cadre['fuzzy']) != emptyCell) data['where']['fuzzy']['cadre'] = cadre['fuzzy']
      var postData = JSON.stringify(data)
      console.log(postData)
      //post
      var _self = this
      // replace getPost with your data fetching util / API wrapper
      $.ajax({
        type: 'POST',
        url: '/students/query',
        data: postData,
        contentType: 'application/json;charset=utf-8',
        dataType: 'json',
        timeout: 5000,
        success: function(result, xhr) {
          for (let key in result) {
            if (key == 'content') {
              //操作成功
              _self.students = result['content']
            } else if (key == 'err') {
              //操作错误
              alert('查询信息错误: ' + result[key]['sqlMessage'])
            }
          }
        },
        error: function(result, xhr) {
          //连接错误
          //console.log(result)
          alert('服务器连接错误: ' + xhr)
        }
      })
    },
    downloadClick: function() {
      downloadModule.downloadClick(this.students)
    },
    importClick: function() {
      $('#button-import').click()
    },
    mubanDownload: function() {
      downloadModule.mubanDownload("cadre")
    },
    //onchange时调用这个函数实现文件选择后上传
    importUpload: function() {
      importModule.importClick($('#button-import').prop('files')[0], 'cadre')
    },
    diycolClick: function() {
      $('#popup').show()
    },
    modalCloseClick: function() {
      $('#popup').hide()
    },
    //发送邮件函数
    sendEmailClick: function() {
      $('#popup-email').show()
      //加载收件人学号
      this.emailSid = []
      for (let i = 0; i < this.students.length; i++) {
        if(this.emailSid.indexOf(this.students[i]['cadre']['sid']) == -1)
          this.emailSid.push(this.students[i]['cadre']['sid'])
      }
    },
    studentClick: function(event) {
      //alert('您点击的学生学号是：' +  event.currentTarget.getAttribute('sid'))
      //跳转,在跳转完成后再请求数据,使用query在url内传参，这样不会有刷新就丢失的问题
      var routeData = this.$router.resolve({
        name: 'detail',
        query: {
          sid: event.currentTarget.getAttribute('sid')
        }
      })
      window.open(routeData.href, '_blank')
    },
    statClick: function() {
      var data = {
        table: 'cadre',
        fields: [],
        condition: {}
      }
      $('.stat-checkbox').each(function() {
        if ($(this).prop("checked")) {
          var recordId = $(this).attr('record-id')
          data['fields'].push(recordId)
          if ($('#cadre-stat-' + recordId).val() != '') {
            data['condition'][recordId] = $('#cadre-stat-' + recordId).val()
          }
        }
      })
      if (data['fields'].length == 0) {
        alert('请选择想要统计的字段！')
        return
      }
      var postData = JSON.stringify(data)
      console.log(postData)
      $.ajax({
        type: 'POST',
        url: '/students/statistic',
        data: postData,
        contentType: 'application/json;charset=utf-8',
        dataType: 'json',
        timeout: 5000,
        success: function(result, xhr) {
          for (let key in result) {
            if (key == 'content') {
              //操作成功，配置图表
              /*let statData = [
						    {gender: '女', major: null, statistic: 2},
						    {gender: '女', major: 123, statistic: 1},
						    {gender: '男', major: 123, statistic: 3},
						    {gender: '男', major: '数学', statistic: 1}
					    ]*/
              console.log(result[key])
              statModule.createCharts('cadre', result[key], 'stat-chart-bar', 'stat-chart-pie')
            } else if (key == 'err') {
              //操作错误
              alert('统计错误: ' + result[key]['sqlMessage'])
            }
          }
        },
        error: function(result, xhr) {
          //连接错误
          //console.log(result)
          alert('服务器连接错误: ' + xhr)
        }
      })
    }
  }
}
</script>
<style>
#manager-cadre .container-header {
  height: 70px;
  line-height: 70px;
  padding-left: 30px;
  text-align: left;
  background-color: white;
  /*shadow*/
  box-shadow: -1px 1px 5px var(--grey-shadow);
  /*设置文字不可被选中*/
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

#manager-cadre .header-text {
  float: left;
  font-size: 20px;
}

#manager-cadre .header-button {
  float: right;
  margin-right: 20px;
}

#manager-cadre .header-button span {
  padding-right: 10px;
  font-weight: bold;
  transition: 0.3s;
  -moz-transition: 0.3s;
  /* Firefox 4 */
  -webkit-transition: 0.3s;
  /* Safari 和 Chrome */
  -o-transition: 0.3s;
  /* Opera */
}

#manager-cadre .header-button span:hover {
  color: var(--blue);
  cursor: pointer;
}

#manager-cadre .container-record {
  float: left;
  width: 360px;
  height: 35px;
  text-align: right;
}

#manager-cadre .container-record .text-range {
  font-size: 12px;
}

#manager-cadre .container-record .min,
#manager-cadre .container-record .max {
  width: 50px;
}

#manager-cadre .container-record .hide-container {
  height: 24px;
  width: 180px;
}

#manager-cadre .manager-button {
  float: left;
  clear: both;
  width: 110px;
  height: 36px;
  margin-left: calc(50% - 55px);
  font-size: 17px;
  color: white;
  background-color: var(--blue);
  border: none;
  transition: 0.3s;
  -moz-transition: 0.3s;
  /* Firefox 4 */
  -webkit-transition: 0.3s;
  /* Safari 和 Chrome */
  -o-transition: 0.3s;
  /* Opera */
}

#manager-cadre .manager-button:hover {
  background-color: var(--blue-hover);
}

#manager-cadre .container-card-list {
  margin: 25px;
  text-align: left;
  padding: 20px;
  /*alert($('#manager-cadre .container-card-list').width())不包含margin，但是会减去padding
  固定了width，才能在内部元素超出宽度时出现滚动条*/
  /*width: 1251.32px;*/
  width: calc(100vw - 275px);
  background-color: white;
  /*radius*/
  border-radius: 3px;
  /*shadow*/
  box-shadow: -1px 1px 5px var(--grey-shadow);
  overflow: auto;
}

#manager-cadre .container-card-list table {
  /*不会自动换行*/
  word-break: keep-all;
  white-space: nowrap;
  min-width: 100%;
  font-size: 14px;
  border-color: var(--grey-shadow);
}

#manager-cadre .container-card-list th,
td {
  padding-left: 8px;
  padding-right: 8px;
  padding-top: 4px;
  padding-bottom: 4px;
}

#manager-cadre .container-card-list tr {
  transition: background 0.3s;
  -moz-transition: background 0.3s;
  /* Firefox 4 */
  -webkit-transition: background 0.3s;
  /* Safari 和 Chrome */
  -o-transition: background 0.3s;
  /* Opera */
}

#manager-cadre .container-card-list tr:not(.table-head):hover {
  background-color: var(--grey-hover);
}

#manager-cadre #button-import {
  display: none;
}

/* 弹窗 (background) */

#manager-cadre .popup-background {
  display: none;
  /* 默认隐藏 */
  position: fixed;
  /* 定位 */
  z-index: 10;
  /* 设置在顶层 */
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  padding-left: 225px;
  padding-top: 60px;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
}


/* 弹窗内容 */

#manager-cadre .popup-content {
  background-color: white;
  margin-top: 100px;
  margin-left: calc(50% - 200px);
  padding: 30px;
  width: 600px;
  height: 400px;
  /*radius*/
  border-radius: 3px;
  /*shadow*/
  box-shadow: -1px 1px 5px var(--grey-shadow);
}

#manager-cadre .popup-cell {
  float: left;
  width: 160px;
  height: 40px;
  text-align: left;
}



/* 关闭按钮 */

#manager-cadre #popup-close {
  position: relative;
  float: right;
  width: 50px;
  height: 50px;
  color: #aaa;
  font-size: 28px;
  font-weight: bold;
  text-align: right;
}

#manager-cadre #popup-close:hover,
#popup-close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}



/*统计*/

#manager-cadre .stat-record {
  float: left;
  width: 300px;
  height: 35px;
  text-align: right;
  font-size: 13px;
}

#manager-cadre .stat-record .hide-container {
  height: 22px;
  width: 140px;
}

#manager-cadre .stat-record input[type="checkbox"] {
  width: 13px;
  height: 13px;
}

#manager-cadre .stat-input {
  width: 10px;
  height: 10px;
}

#manager-cadre #stat-chart-bar {
  float: left;
  margin-top: 20px;
  width: 50%;
}

#manager-cadre #stat-chart-pie {
  float: left;
  margin-top: 20px;
  width: 50%;
}
</style>