<template>
<div id="manager-family">
	<!--顶部菜单-->
	<div class="container-header">
		<p class="header-text">家庭信息管理</p>
		<div class="header-button">
			<span @click="insertClick">插入数据</span>
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
      <input type="text" class="hide-container" v-if="record.valueType=='input'" v-bind:id="'family-'+record.id">
      <select class="hide-container" v-if="record.valueType=='select'" v-bind:id="'family-'+record.id">
      	<option></option>
        <option v-for="option in record.options">{{option}}</option>
      </select>
      <span class="hide-container" v-if="record.valueType=='range'" v-bind:id="'family-'+record.id">
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
		  <tr v-for="(student, index) in students" @click="studentClick" v-bind:sid="student['family']['sid']">
		  	<td>{{index}}</td>
		  	<td v-for="record in table.records" v-if="record['display']==true" contenteditable="false">
		  		<span v-if="student['family'][record.id]!=undefined">{{student['family'][record.id]}}</span>
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
      <select class="hide-container" v-if="record.valueType=='select'" v-bind:id="'family-stat-'+record.id">
      	<option></option>
        <option v-for="option in record.options">{{option}}</option>
      </select>
      <input class="hide-container" type="text" v-else v-bind:id="'family-stat-'+record.id">
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
			table: tableData['family'],
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
        name: 'familyInsert'
      })
		},
		queryClick: function(){
			var family = {equal: {}, range: {}, fuzzy: {}}
			var data = {
        select: ['family'],
        where: {
          equal: {},
          range: {},
          fuzzy: {}
        }
      }
			if ($('#family-sid').val()) {
				var sid = $('#family-sid').val()
				if(!formatCheck['family']['sid']['reg'].test(sid)){
					alert(formatCheck['family']['sid']['msg'])
					return
				} else {
					family['equal']['sid'] = sid
				}
      } else {
      	//验证格式
      	var message = ''
      	for(let item in formatCheck['family']){
      		if(formatCheck['family'][item]['reg'] != null){
      			let record = $('#family-' + item).val()
      			if(record != '' && !formatCheck['family'][item]['reg'].test(record)){
      				message = message + formatCheck['family'][item]['msg']
      			}
      		}
      	}
      	if(message != ''){
      		alert(message)
      		return
      	}
	      if ($('#family-name').val()) family['equal']['name'] = $('#family-name').val()
	      if ($('#family-homeAddress').val()) family['equal']['homeAddress'] = $('#family-homeAddress').val()
	      if ($('#family-fatherName').val()) family['equal']['fatherName'] = $('#family-fatherName').val()
	      if ($('#family-fatherTel').val()) family['equal']['fatherTel'] = $('#family-fatherTel').val()
	      if ($('#family-fatherJob').val()) family['equal']['fatherJob'] = $('#family-fatherJob').val()
	      if ($('#family-motherName').val()) family['equal']['motherName'] = $('#family-motherName').val()
	      if ($('#family-motherTel').val()) family['equal']['motherTel'] = $('#family-motherTel').val()
	      if ($('#family-motherJob').val()) family['equal']['motherJob'] = $('#family-motherJob').val()
	      if ($('#family-familyAveIncome').val()) family['equal']['familyAveIncome'] = $('#family-familyAveIncome').val()
	      if ($('#family-isHard').val()) family['equal']['isHard'] = $('#family-isHard').val()
	      if ($('#family-hardDegree').val()) family['equal']['hardDegree'] = $('#family-hardDegree').val()
	      if ($('#family-hardFamDes').val()) family['equal']['hardFamDes'] = $('#family-hardFamDes').val()
	    }
      if(JSON.stringify(family['equal']) != emptyCell) data['where']['equal']['family'] = family['equal']
      if(JSON.stringify(family['range']) != emptyCell) data['where']['range']['family'] = family['range']
      if(JSON.stringify(family['fuzzy']) != emptyCell) data['where']['fuzzy']['family'] = family['fuzzy']
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
			downloadModule.mubanDownload("family")
		},
		//onchange时调用这个函数实现文件选择后上传
		importUpload: function(){
			importModule.importClick($('#button-import').prop('files')[0], 'family')
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
				table: 'family',
				fields: [],
				condition: {}
			}
			$('.stat-checkbox').each(function(){
				if($(this).prop("checked")){
					var recordId = $(this).attr('record-id')
					data['fields'].push(recordId)
					if( $('#family-stat-' + recordId).val() != ''){
						data['condition'][recordId] = $('#family-stat-' + recordId).val()
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
					    statModule.createCharts('family', result[key], 'stat-chart-bar', 'stat-chart-pie')
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
#manager-family .container-header {
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

#manager-family .header-text {
	float: left;
	font-size: 20px;
}

#manager-family .header-button {
	float: right;
	margin-right: 20px;
}

#manager-family .header-button span{
	padding-right: 10px;
	font-weight: bold;
	transition: 0.3s;
  -moz-transition: 0.3s;  /* Firefox 4 */
  -webkit-transition: 0.3s; /* Safari 和 Chrome */
  -o-transition: 0.3s;  /* Opera */
}

#manager-family .header-button span:hover {
	color: var(--blue);
  cursor: pointer;
}

#manager-family .container-card {
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

#manager-family .container-record {
	float: left;
	width: 360px;
	height: 35px;
	text-align: right;
}

#manager-family .container-record .text-range {
	font-size: 12px;
}

#manager-family .container-record .min, #manager-family .container-record .max {
	width: 50px;
}

#manager-family .container-record .hide-container {
	height: 24px;
	width: 180px;
}

#manager-family .manager-button {
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

#manager-family .manager-button:hover {
	background-color: var(--blue-hover);
}

#manager-family .container-card-list {
  margin: 25px;
  text-align: left;
  padding: 20px;
  /*alert($('#manager-family .container-card-list').width())不包含margin，但是会减去padding
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

#manager-family .container-card-list table {
	/*不会自动换行*/
	word-break: keep-all;
	white-space: nowrap;
	min-width: 100%;
	font-size: 14px;
	border-color: var(--grey-shadow);
}

#manager-family .container-card-list th, td {
	padding-left: 8px;
	padding-right: 8px;
	padding-top: 4px;
	padding-bottom: 4px;
}

#manager-family .container-card-list tr{
	transition: background 0.3s;
  -moz-transition: background 0.3s;  /* Firefox 4 */
  -webkit-transition: background 0.3s; /* Safari 和 Chrome */
  -o-transition: background 0.3s;  /* Opera */
}

#manager-family .container-card-list tr:not(.table-head):hover{
	background-color: var(--grey-hover);
}

#manager-family #button-import {
	display: none;
}
/* 弹窗 (background) */

#manager-family .popup-background {
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
#manager-family .popup-content {
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

#manager-family .popup-cell {
	float: left;
	width: 160px;
	height: 40px;
	text-align: left;
}

/* 关闭按钮 */
#manager-family #popup-close {
	position: relative;
	float: right;
	width: 50px;
	height: 50px;
  color: #aaa;
  font-size: 28px;
  font-weight: bold;
  text-align: right;
}

#manager-family #popup-close:hover, #popup-close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

/*统计*/

#manager-family .stat-record {
	float: left;
	width: 300px;
	height: 35px;
	text-align: right;
	font-size: 13px;
}

#manager-family .stat-record .hide-container {
	height: 22px;
	width: 140px;
}

#manager-family .stat-record input[type="checkbox"] {
	width: 13px;
	height: 13px;
}

#manager-family .stat-input {
	width: 10px;
	height: 10px;
}

#manager-family #stat-chart-bar {
	float: left;
	margin-top: 20px;
	width: 50%;
}

#manager-family #stat-chart-pie {
	float: left;
	margin-top: 20px;
	width: 50%;
}
</style>