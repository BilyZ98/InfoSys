<template>
  <div>
    <!--顶部菜单-->
    <div class="container-header">
      <p class="header-text">国际生信息管理</p>
      <div class="header-button">
        <span @click="insertClick">插入数据</span>
        <span @click="diycolClick">自定义列</span>
      </div>
    </div>
    <!--查询输入-->
    <div class="container-card-list">
      <div class="container-record" v-for="record in table.records" v-if="record.valueType!='file'">
        <span>{{record.name}}:</span>
        <input type="text" class="hide-container" v-if="record.valueType=='input'" v-bind:id="'internationalStudent-'+record.id">
        <select class="hide-container" v-if="record.valueType=='select'" v-bind:id="'internationalStudent-'+record.id">
          <option></option>
          <option v-for="option in record.options">{{option}}</option>
        </select>
        <span class="hide-container" v-if="record.valueType=='range'" v-bind:id="'internationalStudent-'+record.id">
        <span class="text-range">最小值 </span>
        <input type="text" class="min"><span class="text-range">最大值 </span>
        <input type="text" class="max">
        </span>
      </div>
      <button class="manager-button" @click="queryClick">查询</button>
    </div>
    <!--显示数据-->
    <div class="container-card-list">
      <table border="1">
        <tr class="table-head">
          <th>#</th>
          <th v-for="record in table.records" v-if="record['display']==true&&record.valueType!='file'">{{record.name}}</th>
        </tr>
        <tr v-for="(student, index) in students" @click="studentClick" v-bind:sid="student['internationalStudent']['sid']">
          <td>{{index+1}}</td>
          <td v-for="record in table.records" v-if="record['display']==true&&record.valueType!='file'" contenteditable="false">
            <span v-if="student['internationalStudent'][record.id]!=undefined">{{student['internationalStudent'][record.id]}}</span>
            <span v-else>---</span>
          </td>
        </tr>
      </table>
    </div>
    <!--统计-->
    <div class="container-card-list">
      <div class="stat-record" v-for="record in table.records" v-if="record.valueType!='file'">
        <button class="stat-checkbox" v-bind:record-id="record.id" @click="statButtonToggle">{{record.name}}</button>
        <select class="hide-container" v-if="record.valueType=='select'" v-bind:id="'internationalStudent-stat-'+record.id">
          <option></option>
          <option v-for="option in record.options">{{option}}</option>
        </select>
        <input class="hide-container" type="text" v-else v-bind:id="'internationalStudent-stat-'+record.id">
      </div>
      <button class="manager-button" @click="statClick">统计</button>
      <span id="stat-chart-bar"></span>
      <span id="stat-chart-pie"></span>
    </div>
    <!-- 弹窗 -->
    <div id="popup-diy" class="popup-background">
      <!-- 弹窗内容 -->
      <div class="popup-content">
        <span id="popup-close" @click="modalCloseClick">&times;</span>
        <div class="popup-cell" v-for="record in table.records">
          {{record.name}}
          <input type="checkbox" v-model:checked="record.display">
        </div>
      </div>
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
      table: tableData['internationalStudent'],
      students: []
    }
  },
  methods: {
    insertClick: function() {
      this.$router.push({
        name: 'internationalStudentInsert'
      })
    },
    queryClick: function() {
      var internationalStudent = { equal: {}, range: {}, fuzzy: {} }
      var data = {
        select: ['internationalStudent'],
        where: {
          equal: {},
          range: {},
          fuzzy: {}
        }
      }
      if ($('#internationalStudent-sid').val()) {
        var sid = $('#internationalStudent-sid').val()
        if (!formatCheck['internationalStudent']['sid']['reg'].test(sid)) {
          alert(formatCheck['internationalStudent']['sid']['msg'])
          return
        } else {
          internationalStudent['equal']['sid'] = sid
        }
      } else {
        //验证格式
        var message = ''
        for (let item in formatCheck['internationalStudent']) {
          if (formatCheck['internationalStudent'][item]['reg'] != null) {
            let record = $('#internationalStudent-' + item).val()
            if (record != '' && !formatCheck['internationalStudent'][item]['reg'].test(record)) {
              message = message + formatCheck['internationalStudent'][item]['msg']
            }
          }
        }
        if (message != '') {
          alert(message)
          return
        }
        if ($('#internationalStudent-passportName').val()) internationalStudent['equal']['passportName'] = $('#internationalStudent-passportName').val()
        if ($('#internationalStudent-studentClass').val()) internationalStudent['equal']['studentClass'] = $('#internationalStudent-studentClass').val()
        if ($('#internationalStudent-chineseName').val()) internationalStudent['equal']['chineseName'] = $('#internationalStudent-chineseName').val()
        if ($('#internationalStudent-gender').val()) internationalStudent['equal']['gender'] = $('#internationalStudent-gender').val()
        if ($('#internationalStudent-nationality').val()) internationalStudent['equal']['nationality'] = $('#internationalStudent-nationality').val()
        if ($('#internationalStudent-passportNum').val()) internationalStudent['equal']['passportNum'] = $('#internationalStudent-passportNum').val()
        if ($('#internationalStudent-school').val()) internationalStudent['equal']['school'] = $('#internationalStudent-school').val()
        if ($('#internationalStudent-major').val()) internationalStudent['equal']['major'] = $('#internationalStudent-major').val()
        if ($('#internationalStudent-tutor').val()) internationalStudent['equal']['tutor'] = $('#internationalStudent-tutor').val()
        if ($('#internationalStudent-visaClass').val()) internationalStudent['equal']['visaClass'] = $('#internationalStudent-visaClass').val()
        if ($('#internationalStudent-residenceReason').val()) internationalStudent['equal']['residenceReason'] = $('#internationalStudent-residenceReason').val()
        if ($('#internationalStudent-visaExpire').val()) internationalStudent['equal']['visaExpire'] = $('#internationalStudent-visaExpire').val()
        if ($('#internationalStudent-remark').val()) internationalStudent['equal']['remark'] = $('#internationalStudent-remark').val()
        if ($('#internationalStudent-religion').val()) internationalStudent['equal']['religion'] = $('#internationalStudent-religion').val()
        if ($('#internationalStudent-isEthnicChinese').val()) internationalStudent['equal']['isEthnicChinese'] = $('#internationalStudent-isEthnicChinese').val()
        if ($('#internationalStudent-clubJoiningDescription').val()) internationalStudent['equal']['clubJoiningDescription'] = $('#internationalStudent-clubJoiningDescription').val()
        if ($('#internationalStudent-activityTakingDescription').val()) internationalStudent['equal']['activityTakingDescription'] = $('#internationalStudent-activityTakingDescription').val()
        if ($('#internationalStudent-abnormalSitutaion').val()) internationalStudent['equal']['abnormalSitutaion'] = $('#internationalStudent-abnormalSitutaion').val()
        if ($('#internationalStudent-tel').val()) internationalStudent['equal']['tel'] = $('#internationalStudent-tel').val()
        if ($('#internationalStudent-homeAddress').val()) internationalStudent['equal']['homeAddress'] = $('#internationalStudent-homeAddress').val()
        if ($('#internationalStudent-homeInSchool').val()) internationalStudent['equal']['homeInSchool'] = $('#internationalStudent-homeInSchool').val()
        if ($('#internationalStudent-same').val()) internationalStudent['equal']['same'] = $('#internationalStudent-same').val()
        if ($('#internationalStudent-dormRegistryCopy').val()) internationalStudent['equal']['dormRegistryCopy'] = $('#internationalStudent-dormRegistryCopy').val()
        if ($('#internationalStudent-visaCopy').val()) internationalStudent['equal']['visaCopy'] = $('#internationalStudent-visaCopy').val()
        if ($('#internationalStudent-passportCopy').val()) internationalStudent['equal']['passportCopy'] = $('#internationalStudent-passportCopy').val()
        if ($('#internationalStudent-notCompleteReason').val()) internationalStudent['equal']['notCompleteReason'] = $('#internationalStudent-notCompleteReason').val()
      }
      if (JSON.stringify(internationalStudent['equal']) != emptyCell) data['where']['equal']['internationalStudent'] = internationalStudent['equal']
      if (JSON.stringify(internationalStudent['range']) != emptyCell) data['where']['range']['internationalStudent'] = internationalStudent['range']
      if (JSON.stringify(internationalStudent['fuzzy']) != emptyCell) data['where']['fuzzy']['internationalStudent'] = internationalStudent['fuzzy']
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
    //自定义弹窗函数
    diycolClick: function() {
      $('#popup-diy').show()
    },
    modalCloseClick: function() {
      $('#popup-diy').hide()
    },
    //查询学生点击事件
    studentClick: function(event) {
      //alert('您点击的学生学号是：' +  event.currentTarget.getAttribute('sid'))
      //跳转,在跳转完成后再请求数据,使用query在url内传参，这样不会有刷新就丢失的问题
      var routeData = this.$router.resolve({
        name: 'teacherSpecialInfoDetail',
        query: {
          sid: event.currentTarget.getAttribute('sid')
        }
      })
      window.open(routeData.href, '_blank')
    },
    // 统计
    statButtonToggle: function(event) {
      if (event.currentTarget.className == 'stat-checkbox') {
        event.currentTarget.className = 'stat-checkbox-selected'
        $('#internationalStudent-stat-range-' + event.currentTarget.getAttribute('record-id')).show()
      } else if (event.currentTarget.className == 'stat-checkbox-selected') {
        event.currentTarget.className = 'stat-checkbox'
        $('#internationalStudent-stat-range-' + event.currentTarget.getAttribute('record-id')).hide()
      }
    },
    statClick: function() {
      var data = {
        table: 'internationalStudent',
        fields: [],
        condition: {}
      }
      $('.stat-checkbox-selected').each(function() {
        /*
        if ($(this).prop("checked")) {
          var recordId = $(this).attr('record-id')
          data['fields'].push(recordId)
          if ($('#internationalStudent-stat-' + recordId).val() != '') {
            data['condition'][recordId] = $('#internationalStudent-stat-' + recordId).val()
          }
        }
        */
        var recordId = $(this).attr('record-id')
        data['fields'].push(recordId)
        if ($('#internationalStudent-stat-' + recordId).val() != '') {
          data['condition'][recordId] = $('#internationalStudent-stat-' + recordId).val()
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
              statModule.createCharts('internationalStudent', result[key], 'stat-chart-bar', 'stat-chart-pie')
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
<style scoped>
.container-header {
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

.header-text {
  float: left;
  font-size: 20px;
}

.header-button {
  float: right;
  margin-right: 20px;
}

.header-button span {
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

.header-button span:hover {
  color: var(--blue);
  cursor: pointer;
}

.container-record {
  float: left;
  width: 360px;
  height: 35px;
  text-align: right;
}

.container-record .text-range {
  font-size: 12px;
}

.container-record .min,
.container-record .max {
  width: 50px;
}

.container-record .hide-container {
  height: 24px;
  width: 180px;
}

.manager-button {
  float: left;
  clear: both;
  width: 110px;
  height: 36px;
  margin-top: 20px;
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

.manager-button:hover {
  background-color: var(--blue-hover);
}

.container-card-list {
  margin: 25px;
  text-align: left;
  padding: 20px;
  /*alert($('.container-card-list').width())不包含margin，但是会减去padding
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

.container-card-list table {
  /*不会自动换行*/
  word-break: keep-all;
  white-space: nowrap;
  min-width: 100%;
  font-size: 14px;
  border-color: var(--grey-shadow);
}

.container-card-list th,
td {
  padding-left: 8px;
  padding-right: 8px;
  padding-top: 4px;
  padding-bottom: 4px;
}

.container-card-list tr {
  transition: background 0.3s;
  -moz-transition: background 0.3s;
  /* Firefox 4 */
  -webkit-transition: background 0.3s;
  /* Safari 和 Chrome */
  -o-transition: background 0.3s;
  /* Opera */
}

.container-card-list tr:not(.table-head):hover {
  background-color: var(--grey-hover);
}

#button-import {
  display: none;
}

/* 弹窗 (background) */

.popup-background {
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

.popup-content {
  background-color: white;
  margin-top: 100px;
  margin-left: calc(50% - 350px);
  padding: 30px;
  width: 700px;
  height: 500px;
  /*radius*/
  border-radius: 3px;
  /*shadow*/
  box-shadow: -1px 1px 5px var(--grey-shadow);
}

.popup-cell {
  float: left;
  width: 180px;
  height: 40px;
  text-align: left;
}

/* 关闭按钮 */

#popup-close {
  position: relative;
  float: right;
  width: 50px;
  height: 50px;
  color: #aaa;
  font-size: 28px;
  font-weight: bold;
  text-align: right;
}

#popup-close:hover,
#popup-close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

/* 统计 */

.stat-record {
  float: left;
  width: 400px;
  min-height: 38px;
  text-align: right;
  font-size: 13px;
}

.stat-record .hide-container {
  height: 25px;
  width: 150px;
}

/*
.stat-record input[type="checkbox"] {
  width: 13px;
  height: 13px;
}
*/

.stat-checkbox {
  width: 150px;
  height: 28px;
  border: none;
  background-color: var(--grey-hover);
  outline: none;
  transition: 0.3s;
  -moz-transition: 0.3s;
  /* Firefox 4 */
  -webkit-transition: 0.3s;
  /* Safari 和 Chrome */
  -o-transition: 0.3s;
  /* Opera */
}

.stat-checkbox:hover {
  transform: translate(0, -2px);
  box-shadow: 0 2px 2px var(--grey-shadow);
}

.stat-checkbox-selected {
  width: 150px;
  height: 28px;
  border: none;
  color: white;
  background-color: var(--blue);
  transform: translate(0, -2px);
  box-shadow: 0 2px 2px var(--grey-shadow);
  transition: 0.3s;
  -moz-transition: 0.3s;
  /* Firefox 4 */
  -webkit-transition: 0.3s;
  /* Safari 和 Chrome */
  -o-transition: 0.3s;
  /* Opera */
}

.stat-input {
  width: 10px;
  height: 10px;
}

.stat-nonselect-range {
  display: none;
}

#stat-chart-bar {
  float: left;
  margin-top: 20px;
  width: 50%;
}

#stat-chart-pie {
  float: left;
  margin-top: 20px;
  width: 50%;
}
</style>