<template>
<div id="manager-loan">
	<!--顶部菜单-->
	<div class="container-header">
		<p class="header-text">助学贷款管理</p>
		<div class="header-button">
			<!--<span @click="insertClick">插入数据</span>-->
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
      <input type="text" class="hide-container" v-if="record.valueType=='input'" v-bind:id="'loan-'+record.id">
      <select class="hide-container" v-if="record.valueType=='select'" v-bind:id="'loan-'+record.id">
      	<option></option>
        <option v-for="option in record.options">{{option}}</option>
      </select>
      <span class="hide-container" v-if="record.valueType=='range'" v-bind:id="'basicInfo-'+record.id">
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
		  <tr v-for="(student, index) in students" @click="studentClick" v-bind:sid="student['loan']['sid']">
		  	<td>{{index+1}}</td>
		  	<td v-for="record in table.records" v-if="record['display']==true" contenteditable="false">
		  		<span v-if="student['loan'][record.id]!=undefined">{{student['loan'][record.id]}}</span>
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
      <select class="hide-container" v-if="record.valueType=='select'" v-bind:id="'loan-stat-'+record.id">
      	<option></option>
        <option v-for="option in record.options">{{option}}</option>
      </select>
      <input class="hide-container" type="text" v-else v-bind:id="'loan-stat-'+record.id">
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
var empty = JSON.stringify({equal: {}, range: {}, fuzzy: {}})
var emptyCell = JSON.stringify({})

export default {
	data: function(){
		return {
			table: tableData['loan'],
			students: [],
      emailSid: []
		}
	},
	created: function(){
		//alert(window.innerWidth)
		//1536*728
	},
	methods: {
		insertClick: function(){
			this.$router.push({
        name: 'loanInsert'
      })
		},
		queryClick: function(){
			var loan = {equal: {}, range: {}, fuzzy: {}}
			var data = {
        select: ['loan'],
        where: {
          equal: {},
          range: {},
          fuzzy: {}
        }
      }
			if ($('#loan-sid').val()) {
				var sid = $('#loan-sid').val()
				if(!formatCheck['loan']['sid']['reg'].test(sid)){
					alert(formatCheck['loan']['sid']['msg'])
					return
				} else {
					loan['equal']['sid'] = sid
				}
      } else {
      	//验证格式
      	var message = ''
      	for(let item in formatCheck['loan']){
      		if(formatCheck['loan'][item]['reg'] != null){
      			let record = $('#loan-' + item).val()
      			if(record != '' && !formatCheck['loan'][item]['reg'].test(record)){
      				message = message + formatCheck['loan'][item]['msg']
      			}
      		}
      	}
      	if(message != ''){
      		alert(message)
      		return
      	}
      	//格式正确，发送数据到后台
	      if ($('#loan-name').val()) loan['equal']['name'] = $('#loan-name').val()
	      if ($('#loan-submitYear').val()) loan['equal']['submitYear'] = $('#loan-submitYear').val()
	      if ($('#loan-loanYears').val()) loan['equal']['loanYears'] = $('#loan-loanYears').val()
	      if ($('#loan-moneyPerYear').val()) loan['equal']['moneyPerYear'] = $('#loan-moneyPerYear').val()
	      if ($('#loan-loanTotal').val()) loan['equal']['loanTotal'] = $('#loan-loanTotal').val()
	    }
      if(JSON.stringify(loan['equal']) != emptyCell) data['where']['equal']['loan'] = loan['equal']
      if(JSON.stringify(loan['range']) != emptyCell) data['where']['range']['loan'] = loan['range']
      if(JSON.stringify(loan['fuzzy']) != emptyCell) data['where']['fuzzy']['loan'] = loan['fuzzy']
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
			downloadModule.mubanDownload("loan")
		},
		//onchange时调用这个函数实现文件选择后上传
		importUpload: function(){
			importModule.importClick($('#button-import').prop('files')[0], 'loan')
		},
		diycolClick: function(){
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
        //解决重复添加问题
        if(this.emailSid.indexOf(this.students[i]['loan']['sid']) == -1)
          this.emailSid.push(this.students[i]['loan']['sid'])
      }
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
				table: 'loan',
				fields: [],
				condition: {}
			}
			$('.stat-checkbox').each(function(){
				if($(this).prop("checked")){
					var recordId = $(this).attr('record-id')
					data['fields'].push(recordId)
					if( $('#loan-stat-' + recordId).val() != ''){
						data['condition'][recordId] = $('#loan-stat-' + recordId).val()
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
					    statModule.createCharts('loan', result[key], 'stat-chart-bar', 'stat-chart-pie')
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
#manager-loan .container-header {
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

#manager-loan .header-text {
	float: left;
	font-size: 20px;
}

#manager-loan .header-button {
	float: right;
	margin-right: 20px;
}

#manager-loan .header-button span{
	padding-right: 10px;
	font-weight: bold;
	transition: 0.3s;
  -moz-transition: 0.3s;  /* Firefox 4 */
  -webkit-transition: 0.3s; /* Safari 和 Chrome */
  -o-transition: 0.3s;  /* Opera */
}

#manager-loan .header-button span:hover {
	color: var(--blue);
  cursor: pointer;
}

#manager-loan .container-record {
	float: left;
	width: 360px;
	height: 35px;
	text-align: right;
}

#manager-loan .container-record .text-range {
	font-size: 12px;
}

#manager-loan .container-record .min, #manager-loan .container-record .max {
	width: 50px;
}

#manager-loan .container-record .hide-container {
	height: 24px;
	width: 180px;
}

#manager-loan .manager-button {
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

#manager-loan .manager-button:hover {
	background-color: var(--blue-hover);
}

#manager-loan .container-card-list {
  margin: 25px;
  text-align: left;
  padding: 20px;
  /*alert($('#manager-loan .container-card-list').width())不包含margin，但是会减去padding
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

#manager-loan .container-card-list table {
	/*不会自动换行*/
	word-break: keep-all;
	white-space: nowrap;
	min-width: 100%;
	font-size: 14px;
	border-color: var(--grey-shadow);
}

#manager-loan .container-card-list th, td {
	padding-left: 8px;
	padding-right: 8px;
	padding-top: 4px;
	padding-bottom: 4px;
}

#manager-loan .container-card-list tr{
	transition: background 0.3s;
  -moz-transition: background 0.3s;  /* Firefox 4 */
  -webkit-transition: background 0.3s; /* Safari 和 Chrome */
  -o-transition: background 0.3s;  /* Opera */
}

#manager-loan .container-card-list tr:not(.table-head):hover{
	background-color: var(--grey-hover);
}

#manager-loan #button-import {
	display: none;
}

/* 弹窗 (background) */
#manager-loan .popup-background {
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
/* 弹窗 (background) */

#manager-loan .popup-background {
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
#manager-loan .popup-content {
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

#manager-loan .popup-cell {
	float: left;
	width: 160px;
	height: 40px;
	text-align: left;
}

/* 关闭按钮 */
#manager-loan #popup-close {
	position: relative;
	float: right;
	width: 50px;
	height: 50px;
  color: #aaa;
  font-size: 28px;
  font-weight: bold;
  text-align: right;
}

#manager-loan #popup-close:hover, #popup-close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

/*统计*/

#manager-loan .stat-record {
	float: left;
	width: 300px;
	height: 35px;
	text-align: right;
	font-size: 13px;
}

#manager-loan .stat-record .hide-container {
	height: 22px;
	width: 140px;
}

#manager-loan .stat-record input[type="checkbox"] {
	width: 13px;
	height: 13px;
}

#manager-loan .stat-input {
	width: 10px;
	height: 10px;
}

#manager-loan #stat-chart-bar {
	float: left;
	margin-top: 20px;
	width: 50%;
}

#manager-loan #stat-chart-pie {
	float: left;
	margin-top: 20px;
	width: 50%;
}
</style>