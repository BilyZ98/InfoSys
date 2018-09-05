<template>
<div id="manager-schoolRoll">
	<!--顶部菜单-->
	<div class="container-header">
		<p class="header-text">学籍管理</p>
		<div class="header-button">
			<!--<span @click="insertClick">插入数据</span>-->
			<span>上传学生照片</span>
			<span>修改密码</span>
			<span @click="downloadClick">导出</span>
			<span @click="importClick">导入<input id="button-import" v-on:change="importUpload" type="file"></span>
			<span @click="mubanDownload">下载模板</span>
			<span>删除</span>
			<span>编辑</span>
			<span>转毕业生</span>
			<span @click="diycolClick">自定义列</span>
		</div>
	</div>
	<!--查询输入-->
	<div class="container-card-list">
		<div class="container-record" v-for="record in table.records">
      <span>{{record.name}}:</span>
      <input type="text" class="hide-container" v-if="record.valueType=='input'" v-bind:id="'schoolRoll-'+record.id">
      <select class="hide-container" v-if="record.valueType=='select'" v-bind:id="'schoolRoll-'+record.id">
      	<option></option>
        <option v-for="option in record.options">{{option}}</option>
      </select>
      <span class="hide-container" v-if="record.valueType=='range'" v-bind:id="'schoolRoll-'+record.id">
        <span class="text-range">最小值 </span><input type="text" class="min"><span class="text-range">最大值 </span><input type="text" class="max">
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
		  <tr v-for="(student, index) in students" @click="studentClick" v-bind:sid="student['schoolRoll']['sid']">
		  	<td>{{index}}</td>
		  	<td v-for="record in table.records" v-if="record['display']==true" contenteditable="false">
		  		<span v-if="student['schoolRoll'][record.id]!=undefined">{{student['schoolRoll'][record.id]}}</span>
		  		<span v-else>---</span>
		  	</td>
		  </tr>
		</table>
	</div>
	<!--统计-->
	<div class="container-card">
		<div class="stat-record" v-for="record in table.records">
      <span>{{record.name}}:</span>
      <input class="stat-checkbox" type="checkbox" v-bind:record-id="record.id">
      <select class="hide-container" v-if="record.valueType=='select'" v-bind:id="'schoolRoll-stat-'+record.id">
      	<option></option>
        <option v-for="option in record.options">{{option}}</option>
      </select>
      <input class="hide-container" type="text" v-else v-bind:id="'schoolRoll-stat-'+record.id">
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
</div>
</template>

<script>
import tableData from '../javascripts/tableData.js'
import formatCheck from '../javascripts/formatCheck.js'
import downloadModule from '../javascripts/downloadModule.js'
import importModule from '../javascripts/importModule.js'
import statModule from '../javascripts/statisticModule.js'
var empty = JSON.stringify({equal: {}, range: {}, fuzzy: {}})
var emptyCell = JSON.stringify({})

export default {
	data: function(){
		return {
			table: tableData['schoolRoll'],
			students: []
		}
	},
	created: function(){
		//alert(window.innerWidth)
		//1536*728
	},
	methods: {
		insertClick: function(){
			this.$router.push({
        name: 'schoolRollInsert'
      })
		},
		queryClick: function(){
			var schoolRoll = {equal: {}, range: {}, fuzzy: {}}
			var data = {
        select: ['schoolRoll'],
        where: {
          equal: {},
          range: {},
          fuzzy: {}
        }
      }
			if ($('#schoolRoll-sid').val()) {
				var sid = $('#schoolRoll-sid').val()
				if(!formatCheck['schoolRoll']['sid']['reg'].test(sid)){
					alert(formatCheck['schoolRoll']['sid']['msg'])
					return
				} else {
					schoolRoll['equal']['sid'] = sid
				}
      } else {
      	//验证格式
      	var message = ''
      	for(let item in formatCheck['schoolRoll']){
      		if(formatCheck['schoolRoll'][item]['reg'] != null){
      			let record = $('#schoolRoll-' + item).val()
      			if(record != '' && !formatCheck['schoolRoll'][item]['reg'].test(record)){
      				message = message + formatCheck['schoolRoll'][item]['msg']
      			}
      		}
      	}
      	if(message != ''){
      		alert(message)
      		return
      	}
      	//格式正确，发送数据到后台
	      if ($('#schoolRoll-name').val()) schoolRoll['equal']['name'] = $('#schoolRoll-name').val()
	      if ($('#schoolRoll-isAtRoll').val()) schoolRoll['equal']['isAtRoll'] = $('#schoolRoll-isAtRoll').val()
	      if ($('#schoolRoll-class').val()) schoolRoll['equal']['class'] = $('#schoolRoll-class').val()
	      if ($('#schoolRoll-studyYears').val()) schoolRoll['equal']['studyYears'] = $('#schoolRoll-studyYears').val()
	      //range value
	      var rangeVal = {min: $('#schoolRoll-timeInSchool .min').val(), max: $('#schoolRoll-timeInSchool .max').val()}
	      if(rangeVal['min']!='' && rangeVal['max']!=''){
	        schoolRoll['range']['timeInSchool'] = rangeVal
	      }
	      if ($('#schoolRoll-isFee').val()) schoolRoll['equal']['isFee'] = $('#schoolRoll-isFee').val()
	      if ($('#schoolRoll-isArrive').val()) schoolRoll['equal']['isArrive'] = $('#schoolRoll-isArrive').val()
	      if ($('#schoolRoll-isRollChanged').val()) schoolRoll['equal']['isRollChanged'] = $('#schoolRoll-isRollChanged').val()
	      if ($('#schoolRoll-changeTime').val()) schoolRoll['equal']['changeTime'] = $('#schoolRoll-changeTime').val()
	      if ($('#schoolRoll-changeClass').val()) schoolRoll['equal']['changeClass'] = $('#schoolRoll-changeClass').val()
	    }
      if(JSON.stringify(schoolRoll['equal']) != emptyCell) data['where']['equal']['schoolRoll'] = schoolRoll['equal']
      if(JSON.stringify(schoolRoll['range']) != emptyCell) data['where']['range']['schoolRoll'] = schoolRoll['range']
      if(JSON.stringify(schoolRoll['fuzzy']) != emptyCell) data['where']['fuzzy']['schoolRoll'] = schoolRoll['fuzzy']
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
	      	for(let key in result){
	      		if(key == 'content'){
	      			//操作成功
	      			_self.students = result['content']
	      		} else if (key == 'err'){
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
		downloadClick: function(){
			downloadModule.downloadClick(this.students)
		},
		importClick: function(){
			$('#button-import').click()
		},
		mubanDownload: function(){
			downloadModule.mubanDownload("schoolRoll")
		},
		//onchange时调用这个函数实现文件选择后上传
		importUpload: function(){
			importModule.importClick($('#button-import').prop('files')[0], 'schoolRoll')
		},
		diycolClick: function(){
			$('#popup').show()
		},
		modalCloseClick: function() {
			$('#popup').hide()
		},
		studentClick: function(event){
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
		statClick: function(){
			var data = {
				table: 'schoolRoll',
				fields: [],
				condition: {}
			}
			$('.stat-checkbox').each(function(){
				if($(this).prop("checked")){
					var recordId = $(this).attr('record-id')
					data['fields'].push(recordId)
					if( $('#schoolRoll-stat-' + recordId).val() != ''){
						data['condition'][recordId] = $('#schoolRoll-stat-' + recordId).val()
					}
				}
			})
			if(data['fields'].length == 0 ){
				alert('请选择想要统计的字段打勾！')
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
	      	for(let key in result){
					  if(key == 'content'){
					    console.log(result[key])
					    statModule.createCharts('schoolRoll', result[key], 'stat-chart-bar', 'stat-chart-pie')
	      		} else if (key == 'err'){
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
#manager-schoolRoll .container-header {
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

#manager-schoolRoll .header-text {
	float: left;
	font-size: 20px;
}

#manager-schoolRoll .header-button {
	float: right;
	margin-right: 20px;
}

#manager-schoolRoll .header-button span{
	padding-right: 10px;
	font-weight: bold;
	transition: 0.3s;
  -moz-transition: 0.3s;  /* Firefox 4 */
  -webkit-transition: 0.3s; /* Safari 和 Chrome */
  -o-transition: 0.3s;  /* Opera */
}

#manager-schoolRoll .header-button span:hover {
	color: var(--blue);
  cursor: pointer;
}

#manager-schoolRoll .container-card {
  margin: 25px;
  padding: 20px;
  text-align: left;
  background-color: white;
  /*radius*/
  border-radius: 3px;
  /*shadow*/
  box-shadow: -1px 1px 5px var(--grey-shadow);
  /*让float的内部元素可以撑开容器*/
  overflow: hidden;
}

#manager-schoolRoll .container-record {
	float: left;
	width: 360px;
	height: 35px;
	text-align: right;
}

#manager-schoolRoll .container-record .text-range {
	font-size: 12px;
}

#manager-schoolRoll .container-record .min, #manager-schoolRoll .container-record .max {
	width: 50px;
}

#manager-schoolRoll .container-record .hide-container {
	height: 24px;
	width: 180px;
}

#manager-schoolRoll .manager-button {
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
  -moz-transition: 0.3s;  /* Firefox 4 */
  -webkit-transition: 0.3s; /* Safari 和 Chrome */
  -o-transition: 0.3s;  /* Opera */
}

#manager-schoolRoll .manager-button:hover {
	background-color: var(--blue-hover);
}

#manager-schoolRoll .container-card-list {
  margin: 25px;
  text-align: left;
  padding: 20px;
  /*alert($('#manager-schoolRoll .container-card-list').width())不包含margin，但是会减去padding
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

#manager-schoolRoll .container-card-list table {
	/*不会自动换行*/
	word-break: keep-all;
	white-space: nowrap;
	min-width: 100%;
	font-size: 14px;
	border-color: var(--grey-shadow);
}

#manager-schoolRoll .container-card-list th, td {
	padding-left: 8px;
	padding-right: 8px;
	padding-top: 4px;
	padding-bottom: 4px;
}

#manager-schoolRoll .container-card-list tr{
	transition: background 0.3s;
  -moz-transition: background 0.3s;  /* Firefox 4 */
  -webkit-transition: background 0.3s; /* Safari 和 Chrome */
  -o-transition: background 0.3s;  /* Opera */
}

#manager-schoolRoll .container-card-list tr:not(.table-head):hover{
	background-color: var(--grey-hover);
}

#manager-schoolRoll #button-import {
	display: none;
}
/* 弹窗 (background) */

#manager-schoolRoll .popup-background {
  display: none; /* 默认隐藏 */
  position: fixed; /* 定位 */
  z-index: 10; /* 设置在顶层 */
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.4);
}

/* 弹窗内容 */
#manager-schoolRoll .popup-content {
  background-color: white;
  margin-top: calc(50% - 650px);
  margin-left: calc(50% - 200px);
  padding: 30px;
  width: 600px;
	height: 400px;
	/*radius*/
  border-radius: 3px;
  /*shadow*/
  box-shadow: -1px 1px 5px var(--grey-shadow);
}

#manager-schoolRoll .popup-cell {
	float: left;
	width: 160px;
	height: 40px;
	text-align: left;
}

/* 关闭按钮 */
#manager-schoolRoll #popup-close {
	position: relative;
	float: right;
	width: 50px;
	height: 50px;
  color: #aaa;
  font-size: 28px;
  font-weight: bold;
  text-align: right;
}

#manager-schoolRoll #popup-close:hover, #popup-close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

/*统计*/

#manager-schoolRoll .stat-record {
	float: left;
	width: 300px;
	height: 35px;
	text-align: right;
	font-size: 13px;
}

#manager-schoolRoll .stat-record .hide-container {
	height: 22px;
	width: 140px;
}

#manager-schoolRoll .stat-record input[type="checkbox"] {
	width: 13px;
	height: 13px;
}

#manager-schoolRoll .stat-input {
	width: 10px;
	height: 10px;
}

#manager-schoolRoll #stat-chart-bar {
	float: left;
	margin-top: 20px;
	width: 50%;
}

#manager-schoolRoll #stat-chart-pie {
	float: left;
	margin-top: 20px;
	width: 50%;
}
</style>