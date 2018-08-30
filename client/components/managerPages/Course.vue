<template>
<div id="manager-course">
	<!--顶部菜单-->
	<div class="container-header">
		<p class="header-text">课程成绩管理</p>
		<div class="header-button">
			<!--<span @click="insertClick">插入数据</span>-->
			<span>上传学生照片</span>
			<span>修改密码</span>
			<span @click="downloadClick">导出</span>
			<span @click="importClick">导入<input id="button-import" v-on:change="importUpload" type="file"></span>
			<span>下载模板</span>
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
      <input type="text" class="hide-container" v-if="record.valueType=='input'" v-bind:id="'course-'+record.id">
      <select class="hide-container" v-if="record.valueType=='select'" v-bind:id="'course-'+record.id">
      	<option></option>
        <option v-for="option in record.options">{{option}}</option>
      </select>
      <span class="hide-container" v-if="record.valueType=='range'" v-bind:id="'course-'+record.id">
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
		  <tr v-for="(student, index) in students" @click="studentClick" v-bind:sid="student['course']['sid']">
		  	<td>{{index}}</td>
		  	<td v-for="record in table.records" v-if="record['display']==true" contenteditable="false">
		  		<span v-if="student['course'][record.id]!=undefined">{{student['course'][record.id]}}</span>
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
      <select class="hide-container" v-if="record.valueType=='select'" v-bind:id="'course-stat-'+record.id">
      	<option></option>
        <option v-for="option in record.options">{{option}}</option>
      </select>
      <input class="hide-container" type="text" v-else v-bind:id="'course-stat-'+record.id">
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
			table: tableData['course'],
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
        name: 'courseInsert'
      })
		},
		queryClick: function(){
			var course = {equal: {}, range: {}, fuzzy: {}}
			var data = {
        select: ['course'],
        where: {
          equal: {},
          range: {},
          fuzzy: {}
        }
      }
			if ($('#course-sid').val()) {
				var sid = $('#course-sid').val()
				if(!formatCheck['course']['sid']['reg'].test(sid)){
					alert(formatCheck['course']['sid']['msg'])
					return
				} else {
					course['equal']['sid'] = sid
				}
      } else {
      	//验证格式
      	var message = ''
      	for(let item in formatCheck['course']){
      		if(formatCheck['course'][item]['reg'] != null){
      			let record = $('#course-' + item).val()
      			if(record != '' && !formatCheck['course'][item]['reg'].test(record)){
      				message = message + formatCheck['course'][item]['msg']
      			}
      		}
      	}
      	if(message != ''){
      		alert(message)
      		return
      	}
	      if ($('#course-name').val()) course['equal']['name'] = $('#course-name').val()
	      //range value
	      var rangeVal = {min: $('#course-year .min').val(), max: $('#course-year .max').val()}
	      if(rangeVal['min']!='' && rangeVal['max']!=''){
	        course['range']['year'] = rangeVal
	      }
	      //range value
	      rangeVal = {min: $('#course-semester .min').val(), max: $('#course-semester .max').val()}
	      if(rangeVal['min']!='' && rangeVal['max']!=''){
	        course['range']['semester'] = rangeVal
	      }
	      if ($('#course-courseName').val()) course['equal']['courseName'] = $('#cschoolRoll-ourseName').val()
	      if ($('#course-courseId').val()) course['equal']['courseId'] = $('#course-courseId').val()
	      if ($('#course-courseClass').val()) course['equal']['courseClass'] = $('#course-courseClass').val()
	      if ($('#course-courseProperty').val()) course['equal']['courseProperty'] = $('#course-courseProperty').val()
	      if ($('#course-courseHour').val()) course['equal']['courseHour'] = $('#course-courseHour').val()
	      if ($('#course-credit').val()) course['equal']['credit'] = $('#course-credit').val()
	      //range value
	      rangeVal = {min: $('#course-courseGrade .min').val(), max: $('#course-courseGrade .max').val()}
	      if(rangeVal['min']!='' && rangeVal['max']!=''){
	        course['range']['courseGrade'] = rangeVal
	      }
	      //range value
	      rangeVal = {min: $('#course-gpa .min').val(), max: $('#course-gpa .max').val()}
	      if(rangeVal['min']!='' && rangeVal['max']!=''){
	        course['range']['gpa'] = rangeVal
	      }
	      if ($('#course-isPass').val()) course['equal']['isPass'] = $('#course-isPass').val()
	      if ($('#course-rebuild').val()) course['equal']['rebuild'] = $('#course-rebuild').val()
	      if ($('#course-backup').val()) course['equal']['backup'] = $('#course-backup').val()
	    }
      if(JSON.stringify(course['equal']) != emptyCell) data['where']['equal']['course'] = course['equal']
      if(JSON.stringify(course['range']) != emptyCell) data['where']['range']['course'] = course['range']
      if(JSON.stringify(course['fuzzy']) != emptyCell) data['where']['fuzzy']['course'] = course['fuzzy']
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
		//onchange时调用这个函数实现文件选择后上传
		importUpload: function(){
			importModule.importClick($('#button-import').prop('files')[0], 'course')
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
				table: 'course',
				fields: [],
				condition: {}
			}
			$('.stat-checkbox').each(function(){
				if($(this).prop("checked")){
					var recordId = $(this).attr('record-id')
					data['fields'].push(recordId)
					if( $('#course-stat-' + recordId).val() != ''){
						data['condition'][recordId] = $('#course-stat-' + recordId).val()
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
	      			//操作成功，配置图表
	      			/*let statData = [
						    {gender: '女', major: null, statistic: 2},
						    {gender: '女', major: 123, statistic: 1},
						    {gender: '男', major: 123, statistic: 3},
						    {gender: '男', major: '数学', statistic: 1}
					    ]*/
					    console.log(result[key])
					    statModule.createCharts('course', result[key], 'stat-chart-bar', 'stat-chart-pie')
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
#manager-course .container-header {
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

#manager-course .header-text {
	float: left;
	font-size: 20px;
}

#manager-course .header-button {
	float: right;
	margin-right: 20px;
}

#manager-course .header-button span{
	padding-right: 10px;
	font-weight: bold;
	transition: 0.3s;
  -moz-transition: 0.3s;  /* Firefox 4 */
  -webkit-transition: 0.3s; /* Safari 和 Chrome */
  -o-transition: 0.3s;  /* Opera */
}

#manager-course .header-button span:hover {
	color: var(--blue);
  cursor: pointer;
}

#manager-course .container-card {
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

#manager-course .container-record {
	float: left;
	width: 360px;
	height: 35px;
	text-align: right;
}

#manager-course .container-record .text-range {
	font-size: 12px;
}

#manager-course .container-record .min, #manager-course .container-record .max {
	width: 50px;
}

#manager-course .container-record .hide-container {
	height: 24px;
	width: 180px;
}

#manager-course .manager-button {
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

#manager-course .manager-button:hover {
	background-color: var(--blue-hover);
}

#manager-course .container-card-list {
  margin: 25px;
  text-align: left;
  padding: 20px;
  /*alert($('#manager-course .container-card-list').width())不包含margin，但是会减去padding
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

#manager-course .container-card-list table {
	/*不会自动换行*/
	word-break: keep-all;
	white-space: nowrap;
	min-width: 100%;
	font-size: 14px;
	border-color: var(--grey-shadow);
}

#manager-course .container-card-list th, td {
	padding-left: 8px;
	padding-right: 8px;
	padding-top: 4px;
	padding-bottom: 4px;
}

#manager-course .container-card-list tr{
	transition: background 0.3s;
  -moz-transition: background 0.3s;  /* Firefox 4 */
  -webkit-transition: background 0.3s; /* Safari 和 Chrome */
  -o-transition: background 0.3s;  /* Opera */
}

#manager-course .container-card-list tr:not(.table-head):hover{
	background-color: var(--grey-hover);
}

#manager-course #button-import {
	display: none;
}

/* 弹窗 (background) */
#manager-course .popup-background {
  display: none; /* 默认隐藏 */
  position: absolute; /* 定位 */
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
#manager-course .popup-content {
  background-color: white;
  margin: 8% auto;
  padding: 30px;
  width: 600px;
	height: 400px;
	/*radius*/
  border-radius: 3px;
  /*shadow*/
  box-shadow: -1px 1px 5px var(--grey-shadow);
}

#manager-course .popup-cell {
	float: left;
	width: 160px;
	height: 40px;
	text-align: left;
}

/* 关闭按钮 */
#manager-course #popup-close {
	position: relative;
	float: right;
	width: 50px;
	height: 50px;
  color: #aaa;
  font-size: 28px;
  font-weight: bold;
  text-align: right;
}

#manager-course #popup-close:hover, #popup-close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

#manager-course .stat-record {
	float: left;
	width: 300px;
	height: 35px;
	text-align: right;
	font-size: 13px;
}

#manager-course .stat-record .hide-container {
	height: 22px;
	width: 140px;
}

#manager-course .stat-record input[type="checkbox"] {
	width: 13px;
	height: 13px;
}

#manager-course .stat-input {
	width: 10px;
	height: 10px;
}

#manager-course #stat-chart-bar {
	float: left;
	margin-top: 20px;
	width: 50%;
}

#manager-course #stat-chart-pie {
	float: left;
	margin-top: 20px;
	width: 50%;
}
</style>